import "./DataCard.css";

function DataCard({ file }) {

    const data = file.data;

    return (

        <div className="data-card">

            <h2>

                {file.icon}

                {" "}

                {file.title}

            </h2>

            <hr />

            {

                data ?

                <>

                    <p>

                        <b>Status :</b>

                        🟢 Ready

                    </p>

                    <p>

                        <b>File :</b>

                        {data.fileName}

                    </p>

                    <p>

                        <b>Rows :</b>

                        {data.rows?.toLocaleString()}

                    </p>

                    <p>

                        <b>Version :</b>

                        {data.version}

                    </p>

                    <p>

                        <b>Upload :</b>

                        {data.uploadTime}

                    </p>

                </>

                :

                <>

                    <p>❌ Chưa upload</p>

                </>

            }

            <div className="button-group">

                <button>

                    👁 Preview

                </button>

                <button>

                    🔄 Replace

                </button>

                <button>

                    🗑 Delete

                </button>

            </div>

        </div>

    );

}

export default DataCard;