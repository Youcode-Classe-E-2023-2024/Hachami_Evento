import { Link } from "react-router-dom"
const Footer = () => {
    return (
        <footer className="border-t">
            <div className="flex justify-around  h-16" style={{'alignItems':'center'}}>
                <Link href='/'>
                    <h1 className="text-center text-[#fc444a] font-light sm:text-[23px] text-[19px] xxl:text-[40px] flex-1">
                        <span className="text-white">Evento</span> Ticket
                    </h1>
                </Link>

                <p className="text-white">2024 Evento All Right reserved</p>
            </div>
        </footer>
    )
}

export default Footer