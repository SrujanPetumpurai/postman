export default function Home(){
    return(
        <div>
            <div className="box">
                <form action="" className="searchBar">
                    <div className="requestType">
                        <select className="text-black bg-white" name="reqType" id="">
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="DELETE">DELETE</option>
                        </select>
                    </div>
                    <div className="urlBox">
                        <input type="url" name="url" placeholder="https://google.com"/>
                    </div>
                    <div className="sendBtn">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}