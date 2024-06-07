const Warning = () => {
    return (
        <div className="bg-color-primary bg-opacity-10 text-center flex justify-center items-center">
            <div className="p-2 bg-indigo-800 text-color-red shadow-lg leading-none rounded-full inline-flex items-center md:justify-center">
                <span className="font-semibold mr-2 text-center md:text-left flex-auto">
                    Address on bnb contract not yet fully implemented
                </span>
            </div>
        </div>
    )
}

export default Warning