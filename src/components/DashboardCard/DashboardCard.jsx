import "./DashboardCard.css";

function DashboardCard({

    title,

    value,

    icon,

    color,

}){

    return(

        <div className="dashboard-card">

            <div
                className="dashboard-icon"
                style={{
                    background:color
                }}
            >

                {icon}

            </div>

            <div className="dashboard-info">

                <h2>{value}</h2>

                <p>{title}</p>

                <small>Live Data</small>

            </div>

        </div>

    )

}

export default DashboardCard;