import {
    BrowserMultiFormatReader
} from "@zxing/browser";

import {
    BarcodeFormat,
    DecodeHintType
} from "@zxing/library";

import {
    useEffect,
    useRef
} from "react";


function CameraScanner({ onScan }) {


    const videoRef = useRef(null);

    const controlsRef = useRef(null);

    const startedRef = useRef(false);

    const lastScanRef = useRef("");

    const lastTimeRef = useRef(0);



    useEffect(() => {


        // tránh React StrictMode start camera 2 lần
        if (startedRef.current) return;


        startedRef.current = true;



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


        // tăng khả năng đọc barcode khó
        hints.set(
            DecodeHintType.TRY_HARDER,
            true
        );



        const codeReader =
            new BrowserMultiFormatReader(
                hints
            );




        async function startScanner() {


            try {


                const constraints = {
    video: {
        facingMode: {
            ideal: "environment"
        }
    }
};




                const controls =
                    await codeReader
                        .decodeFromVideoDevice(

                            cameraId,

                            videoRef.current,


                            (result, error) => {


                                if (!result) return;



                                const barcode =
                                    result.getText();



                                const now =
                                    Date.now();



                                // chống scan trùng
                                if (

                                    barcode ===
                                    lastScanRef.current

                                    &&

                                    now -
                                    lastTimeRef.current
                                    <
                                    1500

                                ) {

                                    return;

                                }



                                lastScanRef.current =
                                    barcode;


                                lastTimeRef.current =
                                    now;



                                navigator
                                    .vibrate
                                    ?.(
                                        60
                                    );



                                onScan(
                                    barcode
                                );


                            }

                        );



                controlsRef.current =
                    controls;



            }


            catch (error) {


                console.error(
                    "Camera error:",
                    error
                );


            }


        }




        startScanner();





        return () => {


            try {


                if (
                    controlsRef.current
                ) {


                    controlsRef.current
                        .stop();


                    controlsRef.current =
                        null;


                }


            }

            catch (error) {


                console.log(
                    error
                );


            }


        };



    }, [onScan]);





    return (

        <div
            className="camera-container"
            style={{
                position: "relative"
            }}
        >


            <video

                ref={videoRef}

                style={{

                    width: "100%",

                    height: "100%",

                    objectFit: "cover"

                }}

            />



            <div

                className="scan-box"

                style={{

                    position: "absolute",

                    top: "50%",

                    left: "50%",

                    transform:
                        "translate(-50%,-50%)",

                    width: "80%",

                    height: "120px",

                    border:
                        "3px solid #00ff66",

                    borderRadius: "12px"

                }}

            />



            <div

                className="scan-tip"

                style={{

                    position: "absolute",

                    bottom: "20px",

                    width: "100%",

                    textAlign: "center",

                    color: "#fff"

                }}

            >

                Đưa barcode vào vùng quét


            </div>



        </div>

    );


}


export default CameraScanner;