import { Storage } from 'aws-amplify';

export default class S3Utils{
    static async uploadImage(image, folder){
        const base64Parsed = new Buffer(
            image.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
        );

        const type = image.split(";")[0].split("/")[1];

        const fileName = `${folder}/${Math.random()
            .toString(36)
            .substr(2, 15)}.${type}`;

        const { key } = await Storage.put(fileName, base64Parsed, {
            contentType : "image/jpg",
            contentEncoding : "base64"
        });

        return key;
    }
}