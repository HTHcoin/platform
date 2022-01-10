import {Platform} from "../../Platform";
import Identifier from "@hthcoin/dpp/lib/Identifier";

const { hash } = require('@hthcoin/dpp/lib/util/hash');
const crypto = require('crypto');

/**
 * Register names to the platform
 *
 * @param {Platform} this - bound instance class
 * @param {string} name - name
 * @param {Object} records - records object having only one of the following items
 * @param {string} [records.hthUniqueIdentityId]
 * @param {string} [records.hthAliasIdentityId]
 * @param identity - identity
 *
 * @returns registered domain document
 */
export async function register(this: Platform,
                               name: string,
                               records: {
                                   hthUniqueIdentityId?: Identifier|string,
                                   hthAliasIdentityId?: Identifier|string,
                               },
                               identity: {
                                   getId(): Identifier;
                                   getPublicKeyById(number: number):any;
                               },
): Promise<any> {
  await this.initialize();

  if (records.hthUniqueIdentityId) {
        records.hthUniqueIdentityId = Identifier.from(records.hthUniqueIdentityId);
    }

    if (records.hthAliasIdentityId) {
        records.hthAliasIdentityId = Identifier.from(records.hthAliasIdentityId);
    }

    const nameLabels = name.split('.');

    const normalizedParentDomainName = nameLabels
        .slice(1)
        .join('.')
        .toLowerCase();

    const [label] = nameLabels;
    const normalizedLabel = label.toLowerCase();

    const preorderSalt = crypto.randomBytes(32);

    const isSecondLevelDomain = normalizedParentDomainName.length > 0;

    const fullDomainName = isSecondLevelDomain
        ? `${normalizedLabel}.${normalizedParentDomainName}`
        : normalizedLabel;

    const saltedDomainHash = hash(
        Buffer.concat([
            preorderSalt,
            Buffer.from(fullDomainName),
        ]),
    );

    if (!this.client.getApps().has('dpns')) {
        throw new Error('DPNS is required to register a new name.');
    }

    // 1. Create preorder document
    const preorderDocument = await this.documents.create(
        'dpns.preorder',
        identity,
        {
            saltedDomainHash,
        },
    );

    await this.documents.broadcast(
        {
            create: [preorderDocument],
        },
        identity,
    );

    // 3. Create domain document
    const domainDocument = await this.documents.create(
        'dpns.domain',
        identity,
        {
            label,
            normalizedLabel,
            normalizedParentDomainName,
            preorderSalt,
            records,
            subdomainRules: {
                allowSubdomains: !isSecondLevelDomain,
            },
        },
    );

    // 4. Create and send domain state transition
    await this.documents.broadcast(
        {
            create: [domainDocument],
        },
        identity,
    );

    return domainDocument;
}

export default register;
