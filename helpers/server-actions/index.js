async function responseHandler(response, pathname, startTime = null) {

    let clientMessage = null;
    const splitUrl = response.url.split('/integracao/');
    const responseMessage = `${response.status} ${response.statusText}`

    const currentTime = new Date().toLocaleTimeString();
    const duration = (performance.now() - startTime) / 100;

    if (!response.ok) {

        try {
            clientMessage = await response.json();
            if (response.status >= 500) {
                clientMessage = "Erro no Servidor de Integração";
            } else if (response.status == 403) {
                clientMessage = "Necessário permissões adicionais"
            } else if (response.status >= 400) {
                clientMessage = "Erro na solicitação. Verifique os dados enviados";
            } 
        } catch {
            clientMessage = "Erro no tratamento da resposta do servidor de Integração";
        }

        console.log(`\n ○ ${pathname} at ${currentTime}.\n ⨯ /integracao/${splitUrl[1]} - ${responseMessage} - ${clientMessage}. Took ${duration.toFixed(3)} milliseconds.`);

        return {
            success: false,
            status: response.status,
            statusText: response.statusText,
            error: { message: clientMessage },
        };
    }

    console.log(`\n ○ ${pathname} at ${currentTime}.\n ✓ /integracao/${splitUrl[1]} - ${responseMessage}. Took ${duration.toFixed(3)} milliseconds.`);

    let data = null
    try { data = await response.json() } catch { data = null }
    return {
        success: true,
        status: response.status,
        data: data?.data ? data.data : data,
        error: { message: null }
    };

}

const responseError = { success: false, status: 500, data: null, error: null }

export { responseHandler, responseError }