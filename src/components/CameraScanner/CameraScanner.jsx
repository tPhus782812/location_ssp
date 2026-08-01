import { FaCameraRotate } from "react-icons/fa6";

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

    const lastScanRef = useRef("");

    const lastTimeRef = useRef(0);



    const [cameraMode, setCameraMode] =
        useState("environment");


    const [isScanning, setIsScanning] =
        useState(true);





    // 🔊 tạo tiếng beep
    function playBeep(){


        const audioContext =
            new AudioContext();


        const oscillator =
            audioContext.createOscillator();


        const gainNode =
            audioContext.createGain();



        oscillator.type = "square";

        oscillator.frequency.value = 900;


        gainNode.gain.value = 0.1;



        oscillator.connect(gainNode);

        gainNode.connect(
            audioContext.destination
        );



        oscillator.start();



        setTimeout(()=>{


            oscillator.stop();

            audioContext.close();


        },120);


    }






    async function startScanner(mode){


        try{


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




                        // chống scan trùng

                        if(

                            code === lastScanRef.current

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




                        // 🔊 beep

                        playBeep();



                        // 📳 rung

                        navigator.vibrate?.(60);




                        // 📷 tắt camera

                        if(
                            controlsRef.current
                        ){

                            controlsRef.current.stop();

                        }



                        setIsScanning(false);




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


        if(isScanning){

            startScanner(
                cameraMode
            );

        }



        return()=>{


            if(
                controlsRef.current
            ){

                controlsRef.current.stop();

            }


        };


    },[cameraMode,isScanning]);









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







    function restartScanner(){


        setIsScanning(true);


    }








    return (


        <div className="scanner-wrapper">



            {
                isScanning &&

                <video

                    ref={videoRef}

                    className="scanner-video"

                />

            }





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








            {

                !isScanning &&


                <button

                    className="scan-again-btn"

                    onClick={restartScanner}

                >

                    Quét lại


                </button>


            }





        </div>


    );


}


export default CameraScanner;