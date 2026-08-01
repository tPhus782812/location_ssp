import { useEffect, useRef } from "react";
import {
    Html5Qrcode,
    Html5QrcodeSupportedFormats
} from "html5-qrcode";

function CameraScanner({ onScan }) {

    const scannerRef = useRef(null);
    const startedRef = useRef(false);

    useEffect(() => {

        const html5QrCode = new Html5Qrcode("reader");
        scannerRef.current = html5QrCode;

        async function startScanner() {

            try {

                const cameras = await Html5Qrcode.getCameras();

                let cameraId;

                if (cameras.length > 0) {

                    const backCamera = cameras.find(camera =>
                        camera.label.toLowerCase().includes("back") ||
                        camera.label.toLowerCase().includes("rear")
                    );

                    cameraId = backCamera
                        ? backCamera.id
                        : cameras[cameras.length - 1].id;

                }

                await html5QrCode.start(

                    cameraId || {
                        facingMode: "environment"
                    },

                    {

                        fps: 10,

                        qrbox: {

                            width: 320,
                            height: 180

                        },

                        aspectRatio: 16 / 9,

                        disableFlip: true,

                        rememberLastUsedCamera: true,

                        formatsToSupport: [

                            Html5QrcodeSupportedFormats.EAN_13,
                            Html5QrcodeSupportedFormats.EAN_8,
                            Html5QrcodeSupportedFormats.CODE_128,
                            Html5QrcodeSupportedFormats.CODE_39,
                            Html5QrcodeSupportedFormats.UPC_A,
                            Html5QrcodeSupportedFormats.UPC_E

                        ]

                    },

                    (decodedText) => {

                        navigator.vibrate?.(60);

                        onScan(decodedText);

                    },

                    () => { }

                );

                startedRef.current = true;

            }

            catch (err) {

                console.error(err);

            }

        }

        startScanner();

        return async () => {

            try {

                if (
                    scannerRef.current &&
                    startedRef.current
                ) {

                    await scannerRef.current.stop();

                    await scannerRef.current.clear();

                }

            }

            catch (err) {

                console.log(err);

            }

        };

    }, [onScan]);

    return (

        <div className="camera-container">

            <div id="reader"></div>

            <div className="scan-tip">

                Đưa Barcode vào giữa khung để quét

            </div>

        </div>

    );

}

export default CameraScanner;