import "./PreviewModal.css";

function PreviewModal({

    open,

    onClose,

    data

}){

    if(!open) return null;

    const rows = data?.data || [];

    const columns =

        rows.length

        ?

        Object.keys(rows[0])

        :

        [];

    return(

        <div className="modal">

            <div className="modal-box">

                <div className="modal-header">

                    <h2>

                        Preview

                    </h2>

                    <button

                        onClick={onClose}

                    >

                        ✖

                    </button>

                </div>

                <table>

                    <thead>

                        <tr>

                            {

                                columns.map(col=>

                                    <th

                                        key={col}

                                    >

                                        {col}

                                    </th>

                                )

                            }

                        </tr>

                    </thead>

                    <tbody>

                        {

                            rows

                            .slice(0,20)

                            .map((row,index)=>

                                <tr key={index}>

                                    {

                                        columns.map(col=>

                                            <td

                                                key={col}

                                            >

                                                {

                                                    row[col]

                                                }

                                            </td>

                                        )

                                    }

                                </tr>

                            )

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default PreviewModal;