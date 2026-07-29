import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function CameraScanner({ onScan }) {

    useEffect(() => {

        const scanner = new Html5QrcodeScanner(
            "reader",
            {
                fps: 10,
                qrbox: {
                    width: 250,
                    height: 120
                },
                rememberLastUsedCamera: true
            },
            false
        );

        scanner.render(

            (decodedText) => {

                onScan(decodedText);

            },

            () => {}

        );

        return () => {

            scanner.clear().catch(() => {});

        };

    }, []);

    return (

        <div id="reader"></div>

    );

}

export default CameraScanner;