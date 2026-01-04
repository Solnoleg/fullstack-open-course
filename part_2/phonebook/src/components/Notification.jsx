const Notification = ({ message }) => {
    if (message === null || message === "") {
        return null
    }

    return (
        <div className="info">
            {message}
        </div>
    )
}

export default Notification