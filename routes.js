const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;

    if (url === '/users') {
        const htmlContent = [
            '<html>',
            '<head><title>Hello World!</title></head>',
            '<body>',
            '<ul>',
            '<li>User 1</li>',
            '<li>User 2</li>',
            '<li>User 3</li>',
            '<h1>Hello from my Node.js Server!</h1></body>',
            '</body>',
            '</html>'
        ]

        for (let i = 0; i < htmlContent.length; i++) {
            res.write(htmlContent[i]);
        }

        return res.end();
    }

    if (url === '/create-user' && req.method === 'POST') {
        const body = []
        req.on('data', chunk => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const user = parsedBody.split('=')[1];
            fs.writeFile('users.txt', user, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }

    const htmlContent = [
        '<html>',
        '<head><title>Hello World!</title></head>',
        '<body>',
        '<h1>Hello World!</h1>',
        '<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Create</button</form>',
        '</body>',
        '</html>'
    ]

    for (let i = 0; i < htmlContent.length; i++) {
        res.write(htmlContent[i]);
    }



    return res.end();
}

module.exports = requestHandler;