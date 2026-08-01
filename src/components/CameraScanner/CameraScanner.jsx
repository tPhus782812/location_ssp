import {FaCameraRotate} from "react-icons/fa6";
import {
    BrowserMultiFormatReader
} from "@zxing/browser";

import {
    BarcodeFormat,
    DecodeHintType
} from "@zxing/library";

import {
    useEffect,
    useRef,
    useState
} from "react";


function CameraScanner({ onScan }) {


    const videoRef = useRef(null);

    const controlsRef = useRef(null);

    const readerRef = useRef(null);

    const lastScanRef = useRef("");

    const lastTimeRef = useRef(0);



    const [cameraMode, setCameraMode] =
        useState("environment");



    async function startScanner(mode) {


        try {


            if(controlsRef.current){

                controlsRef.current.stop();

            }



            const hints = new Map();


            hints.set(
                DecodeHintType.POSSIBLE_FORMATS,
                [
                    BarcodeFormat.CODE_128,
                    BarcodeFormat.EAN_13,
                    BarcodeFormat.EAN_8,
                    BarcodeFormat.CODE_39,
                    BarcodeFormat.UPC_A,
                    BarcodeFormat.UPC_E
                ]
            );


            hints.set(
                DecodeHintType.TRY_HARDER,
                true
            );



            const codeReader =
                new BrowserMultiFormatReader(
                    hints
                );


            readerRef.current =
                codeReader;




            const controls =
                await codeReader.decodeFromConstraints(


                    {

                        video:{

                            facingMode:{
                                ideal: mode
                            },

                            width:{
                                ideal:1280
                            },

                            height:{
                                ideal:720
                            }

                        }

                    },


                    videoRef.current,


                    (result)=>{


                        if(!result)
                            return;



                        const code =
                            result.getText();



                        const now =
                            Date.now();



                        if(

                            code ===
                            lastScanRef.current

                            &&

                            now -
                            lastTimeRef.current
                            <
                            1500

                        ){

                            return;

                        }



                        lastScanRef.current =
                            code;


                        lastTimeRef.current =
                            now;



                        navigator.vibrate?.(60);


                        onScan(code);


                    }


                );



            controlsRef.current =
                controls;


        }

        catch(error){

            console.log(
                "Camera error",
                error
            );

        }

    }




    useEffect(()=>{


        startScanner(
            cameraMode
        );



        return()=>{


            if(
                controlsRef.current
            ){

                controlsRef.current.stop();

            }


        };


    },[cameraMode]);






    function changeCamera(){


        setCameraMode(
            prev =>
                prev === "environment"
                ?
                "user"
                :
                "environment"
        );


    }






    return (


        <div className="scanner-wrapper">



            <video

                ref={videoRef}

                className="scanner-video"

            />




            <div className="scanner-header">


                <button

                    className="camera-btn"

                    onClick={changeCamera}

                >

                    <FaCameraRotate />

                </button>


            </div>





            <div className="scan-frame">


                <div className="scan-line"/>


            </div>





            {/* <div className="scan-tip">


                Đưa barcode vào giữa khung


            </div> */}



        </div>


    );

}


export default CameraScanner;