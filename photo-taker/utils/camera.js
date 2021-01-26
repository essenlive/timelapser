const gphoto = require('../node_modules/gphoto2_ffi/index.js');
const path = require('path');
const ref = require('ref');
const pad = require('pad-number');

// Define initialise camera
const Camera = {
    camera : null,
    context : null,
    dir: null,
    init: (dir) => {
        console.log('Initializing camera');
        Camera.dir = dir;
        return new Promise((resolve, reject) => {
            try {
                Camera.context = gphoto.gp_context_new();
                Camera.camera = gphoto.NewInitCamera(Camera.context);                
                resolve(true);
            } catch (e) {
                reject('Camera not connected');
            }
        });
    },
    takePicture: (id) => {
        //Check for LCD initialization
        if (Camera.camera === null) throw new Error("Camera not initialized")

        console.log('Taking Picture');
        let imageName = `img-${pad(id, 4)}.jpg`;
        let dest_path = path.join(Camera.dir, imageName);
        let pathPtr = ref.alloc(gphoto.CameraFilePath);
        let res = gphoto.gp_camera_capture(Camera.camera, gphoto.GP_CAPTURE_IMAGE, pathPtr, Camera.context);

        return new Promise((resolve, reject) => {
            
            if (res < 0) reject(`Could not capture image:\n${gphoto.gp_port_result_as_string(res)}`);
            let path_folder = pathPtr.deref().folder.buffer.readCString(0);
            let path_name = pathPtr.deref().name.buffer.readCString(0);
            
            let destPtr = ref.alloc(gphoto.CameraFile);
            if (gphoto.gp_file_new(destPtr) < 0) reject("Could not create file");
            
            let dest = destPtr.deref();
            console.log(Camera.camera);
            console.log(path_folder);
            console.log(path_name);
            console.log(dest);
            console.log( Camera.context);
            
            res = gphoto.gp_camera_file_get(Camera.camera, path_folder, path_name, gphoto.GP_FILE_TYPE_NORMAL, dest, Camera.context);
            if (res < 0) reject(`Could not load image:\n${gphoto.gp_port_result_as_string(res)}`);
   
            res = gphoto.gp_file_save(dest, dest_path);
            if (res < 0) reject(`Could not save image in ${dest_path}:\n${gphoto.gp_port_result_as_string(res)}`);

            //gphoto.gp_file_unref(dest);
            
            resolve(dest_path);
        })
    }
}

module.exports = Camera;