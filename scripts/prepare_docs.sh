# Consolidate package docs into one folder for building documentation
cp -r ./packages/js-dapi-client/docs/ ./docs/DAPI-Client
mv ./docs/DAPI-Client/_sidebar.md ./docs/DAPI-Client/Overview.md
cp -r ./packages/js-dpp/docs/ ./docs/HTH-Platform-Protocol
mv ./docs/HTH-Platform-Protocol/_sidebar.md ./docs/HTH-Platform-Protocol/Overview.md
cp -r ./packages/js-hth-sdk/docs/ ./docs/SDK
mv ./docs/SDK/_sidebar.md ./docs/SDK/Overview.md
cp -r ./packages/wallet-lib/docs/ ./docs/Wallet-library
mv ./docs/Wallet-library/_sidebar.md ./docs/Wallet-library/Overview.md
