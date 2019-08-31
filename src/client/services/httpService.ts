async function get(path: string) {
    return await fetch(path, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'GET'
    }).then(async response => {
        const json = await response.json()
        console.log(json)
        return json
    }).catch(error => {
        alert(error)
    })
}

async function post(path: string, body: any) {
    return await fetch(path, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'POST',
        body: body
    }).then(async response => {
        const json = await response.json()
        console.log(json)
        return json
    }).catch(error => {
        alert(error)
    })
}

async function httpDelete(path: string) {
    return await fetch(path, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'DELETE'
    }).then(async response => {
        const json = await response.json()
        console.log(json)
        return json
    }).catch(error => {
        alert(error)
    })
}

export const http = {
    get,
    delete: httpDelete,
    post
}