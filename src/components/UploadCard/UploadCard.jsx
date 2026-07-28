import "./UploadCard.css";

function UploadCard({
    title,
    icon,
    onChange
}) {

    return (

        <label className="upload-card">

            <div className="upload-icon">

                {icon}

            </div>

            <h3>{title}</h3>

            <p>

                Chọn hoặc kéo file Excel

            </p>

            <input
                type="file"
                accept=".xlsx,.xls"
                hidden
                onChange={onChange}
            />

        </label>

    );

}

export default UploadCard;