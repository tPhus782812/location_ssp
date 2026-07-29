import { useEffect } from "react";
import { 
    Html5QrcodeScanner,
    Html5QrcodeSupportedFormats
} from "html5-qrcode";

function CameraScanner({ onScan }) {

    useEffect(() => {

        const scanner = new Html5QrcodeScanner(
            "reader",
            {
                fps: 15,

                qrbox: {
                    width: 280,
                    height: 150
                },

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
            false
        );


        scanner.render(

            (decodedText) => {

                console.log("Barcode:", decodedText);

                onScan(decodedText);

            },

            () => {}

        );


        return () => {

            scanner.clear()
                .catch(() => {});

        };


    }, [onScan]);


    return (

        <div id="reader"></div>

    );

}

export default CameraScanner;