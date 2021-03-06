import express from 'express';
import fileUpload from 'express-fileupload';

module.exports = (app: express.Express) => {
    app.post('/upload', (req: express.Request, res: express.Response) => {
        try {
            if (!req.files) {
                res.send({
                    status: false,
                    message: 'No file uploaded'
                });
            } else {
                //Use the name of the input field (i.e. "file") to retrieve the uploaded file
                const file: fileUpload.UploadedFile = req.files.file;
                
                //Use the mv() method to place the file in upload directory (i.e. "uploads")
                file.mv('./public/' + file.name);

                //send response
                res.send({
                    status: true,
                    message: 'File is uploaded',
                    data: {
                        name: file.name,
                        mimetype: file.mimetype,
                        size: file.size
                    }
                });
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });
}

