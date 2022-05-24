// eslint-disable-next-line no-use-before-define
export { checkParams, createUriString };

function checkParams(params) {
    const validParams = ['nom', 'dir', 'ape', 'nbrep', 'debut'];
    const givenParams = Object.keys(params);

    let isValid = givenParams.every( param => validParams.includes(param) && typeof params[param] === 'string' );

    return isValid;
}

function createUriString(params, token) {
    if (!token) return null;

    const givenParams = Object.entries(params);
    let uriStr = 'https://api.societe.com/pro/dev/societe/search?format=json&token=' + token;

    givenParams.forEach(([key, value]) => {
        uriStr += `&${key}=${value}`
    });

    return uriStr;
}