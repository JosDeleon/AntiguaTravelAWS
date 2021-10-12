<template>
    <div>
        <v-row no-gutters justify="center" align="center">
            <v-col cols="8">
                <v-file-input
                    show-size
                    label="Select Image"
                    accept="image/*"
                    @change="selectImage"
                ></v-file-input>
            </v-col>
            <v-col cols="4" class="pl-2">
                <v-btn color="success" dark small @click="upload">
                    Upload
                    <v-icon right dark>mdi-cloud-upload</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <div v-if="previewImage">
            <div>
                <img class="preview my-3" :src="previewImage" alt="" />
            </div>
        </div>
    </div>
</template>

<script>
import { Storage } from 'aws-amplify';

export default{
    name : "TestForImage",
    data(){
        return {
            currentImage : undefined,
            previewImage : undefined
        };
    },
    methods : {
        selectImage(image){
            this.currentImage = image;
            this.previewImage = URL.createObjectURL(this.currentImage);
        },
        async upload(){
            console.log(this.currentImage.name);
            if(!this.currentImage){
                this.message = "Please select an Image!";
                return;
            }
            const url = Storage.put(this.currentImage.name, this.currentImage, {
                progressCallback(progress) {
                    console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
                },
            });
            
            console.log('=======================================');
            console.log(url);
            console.log('=======================================');
        }
    },
    layout : 'empty'
}
</script>