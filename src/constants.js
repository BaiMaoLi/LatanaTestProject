const discorgs_api_prefix = "https://api.discogs.com/"
const discorgs_key='myMQBSPbhxFIurjKZMES'
const discorgs_secret='KNlBhYNqoovToJwgVjPmkLLnpjJQEsJJ'
const discorgs_credential=`key=${discorgs_key}&secret=${discorgs_secret}`
const discorgs_header={
    'Accept':'application/vnd.discogs.v2.html+json',
}
export default {
    discorgs_api_prefix: discorgs_api_prefix,
    discorgs_key:discorgs_key,
    discorgs_secret:discorgs_secret,
    discorgs_credential:discorgs_credential,
    discorgs_header:discorgs_header
}