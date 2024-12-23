



// SVG Icons

import { ReactComponent as IconAlign } from './assets/icon-align.svg'
import { ReactComponent as IconArrowDouble } from './assets/icon-arrow-double.svg'
import { ReactComponent as IconArrow } from './assets/icon-arrow.svg'
import { ReactComponent as IconCall } from './assets/icon-call.svg'
import { ReactComponent as IconClock } from './assets/icon-clock.svg'
import { ReactComponent as IconDate } from './assets/icon-date.svg'
import { ReactComponent as IconDot } from './assets/icon-dot.svg'
import { ReactComponent as IconGroup } from './assets/icon-group.svg'
import { ReactComponent as IconSearch } from './assets/icon-search.svg'

import { ReactComponent as IconPause } from './assets/icon-pause.svg'
import { ReactComponent as IconPlay } from './assets/icon-play.svg'
import { ReactComponent as IconRenaud } from './assets/icon-renaud.svg'



// Images
import Img01 from './assets/img-0-1.png'
import Img02 from './assets/img-0-2.png'
import Img030 from './assets/img-0-30.png'
import Img031 from './assets/img-0-31.png'
import Img032 from './assets/img-0-32.png'
import Img1 from './assets/img-1.png'
import Img5 from './assets/img-5.png'
import Img10 from './assets/img-10.png'
import Img25 from './assets/img-25.png'
import Img50 from './assets/img-50.png'
import Img100 from './assets/img-100.png'
import Img250 from './assets/img-250.png'
import Img500 from './assets/img-500.png'
import Img1000 from './assets/img-1000.png'


import styles from './index.module.css'


const rewardsList = [
    {
        text: "Primera llamada 2 min",
        value: 0.1
    },
    {
        text: "Agengar nueva cita con responsable",
        value: 0.2
    },
    {
        text: "Explicar producto 5m demo",
        value: 0.3
    },
    {
        text: "Respuesta email",
        value: 0.3
    },
    {
        text: "Registro en la plataforma",
        value: 0.3
    },
    {
        text: "+20 documentos",
        value: 1
    },
    {
        text: "+200 documentos",
        value: 5
    },
    {
        text: "+500 documentos",
        value: 10
    },
    {
        text: "+1.000 documentos",
        value: 25
    },
    {
        text: "+2.000 documentos",
        value: 50
    },
    {
        text: "+5.000 documentos",
        value: 100
    },
    {
        text: "+20.000 documentos",
        value: 250
    },
    {
        text: "+50.000 documentos",
        value: 500
    },
    {
        text: "+100.000 documentos",
        value: 1000
    }
];



const business = {
    email: 'info@aythen.com',
    phone: '341-59-15',
    web: 'www.domain.com',
    city: 'Barcelona, 08130',
    address: 'Pasaje Barcelona núm. 8, (08130), Santa Perpetua De Mogoda, Barcelona, Cataluña',
    cnae: '7219 - Otra investigación y desarrollo experimental en ciencias naturales y técnicas',
    social: 'LA FORMALIZACION EN INVESTIGACION Y DESARROLLO DE PERSONAL DE CARACTER TECNICO, TANTO EN UNIVERSIDADES NACIONALES COMO EXTRANJERAS A FIN DETRABAJAR EN PROYECTOS FINANCIEROS POR LA COMUNIDAD EUROPEA. ETC',
    facture: 'En base a la facturación del mercado valorado en 7702 millones de euros y el ranking, se calcula una factración  aproximada de 433 mil euros',
    cif: 'B61077863',
    date: '03/10/2018',
    society: 'Sociedad limitada',
    partner: 'John Doe (Administrador), John Doe (-),'
}

const Reseller = () => {
    return (
        <div className={styles.containerReseller}>
            <ComponentHeader />
            <div className={styles.container}>
                <ComponentLeft />
                <ComponentRight />
            </div>
        </div>
    )
}

// <div>
//     <ul>
//         {rewardsList.map((item, index) => (
//             <li>
//                 <IconDot />
//                 Primera llamada 2 min
//                 0.1€
//                 Failure to reach
//             </li>
//         ))}
//     </ul>
// </div>


export default Reseller




const ComponentHeader = () => {
    return (
        <div className={styles.componentHeader}>
            <div className={styles.number}>
                <div>
                    <IconDot />
                    <span>
                        Ingresos
                    </span>
                </div>
                <b>
                    100€
                </b>
            </div>
            <div className={styles.graph}>
                graph
            </div>
            <div className={styles.number}>
                <div>
                    <IconDot />
                    <span>
                        Recompensas
                    </span>
                </div>
                <b>
                    100€
                </b>
            </div>
        </div>
    )
}


const ComponentLeft = () => {
    return (
        <div className={styles.componentLeft}>
            <div className={styles.box}>
                <div className={styles.header}>
                    <div>
                        <div>
                            <IconCall />
                            Pendientes
                            <IconArrow />
                        </div>
                        <span>
                            256
                        </span>
                    </div>
                    <div>
                        <IconSearch />
                        Search
                        <IconSearch />
                    </div>
                </div>
                <div className={styles.filter}>
                    <div>
                        <LabelSelect
                            text={"Status"}
                        />
                        <LabelSelect
                            text={"Product"}
                        />
                        <LabelSelect
                            text={"Priority"}
                        />
                    </div>
                    <div>
                        <IconAlign />
                        default
                    </div>
                </div>
                <ul className={styles.item}>
                    {[""].map((item, index) => (
                        <li key={index}>
                            <div>
                                Emprsesa0
                                <IconArrow />
                            </div>
                            High
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.box}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <IconCall />
                        LLamadas
                        <IconArrow />
                    </div>
                    256
                </div>
                <ul className={styles.item}>
                    {[""].map((item, index) => (
                        <li key={index}>
                            <div>
                                Empresa 0
                                <div>
                                    <IconArrow />
                                    High
                                </div>
                                <div>
                                    No alcanzado
                                </div>
                            </div>
                            <div>
                                <div>
                                    <IconDate />
                                    21.02.2023
                                </div>
                                <div>
                                    <IconClock />
                                    11:30 AM
                                </div>
                                <div>
                                    +0,00€
                                    <IconArrow />
                                    00:31
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>


            <div className={styles.box}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <IconCall />
                        Actividad Reciente
                        <IconArrow />
                    </div>
                    <span>
                        256
                    </span>
                </div>

                <ul className={styles.item}>
                    {[""].map((item, index) => (
                        <li key={index}>
                            <IconDot />
                            <div className={styles.image}>
                                <img src={Img01} />
                            </div>
                            <div className={styles.content}>
                                <div>
                                    <strong>
                                        Feb 21
                                    </strong>
                                    2023
                                    19.02.2023
                                </div>
                                <p>
                                    Primera llamada 2min
                                </p>
                            </div>
                            <label>
                                0.1€
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}




const ComponentRight = () => {
    return (
        <div>
            <div className={styles.twilio}>
                <div>
                    <button>
                        <IconPause />
                    </button>
                    <button>
                        <IconPlay />
                    </button>
                    <button>
                        <IconRenaud />
                    </button>
                </div>
                <span>
                    02:02:02
                </span>
            </div>

            <div>

                <div className={styles.business}>
                    <div>
                        Empresa1
                        <div>
                            <IconDot />
                            No se logro alcanzar
                        </div>
                    </div>
                    <div>
                        <IconArrow />
                        High priority
                    </div>
                </div>

                <div className={styles.buttons}>
                    <div>
                        <IconCall />
                        Call
                    </div>
                    <div>
                        <IconCall />
                        Mail
                    </div>
                </div>


                <div className={styles.box}>
                    <label>
                        Cuenta
                    </label>
                    <div className={styles.grid}>
                        <div>
                            <label>
                                Cuenta
                            </label>
                            <ul>
                                <li>
                                    Método de Pago
                                </li>
                                <li>
                                    Not found
                                    Alta nuevo cliente
                                </li>
                            </ul>
                        </div>
                        <div>
                            <label>
                                Método de Pago
                            </label>
                            <ul>
                                <li>
                                    Not found
                                    Registrado
                                </li>
                                <li>
                                    coolmail@mail.com
                                    ***0000
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


                <div className={styles.box}>
                    <label>
                        Next Meeting
                    </label>
                    <ul className={styles.item}>
                        <li>
                            <IconGroup />
                            <div>
                                Not arranged
                                <a>
                                    Agendar llamada con cliente
                                </a>
                            </div>
                        </li>
                        <li>
                            <IconGroup />
                            <div>
                                <strong>
                                    Pendiente
                                </strong>
                                01/01/2025
                                <b>
                                    Modificar
                                </b>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className={styles.box}>
                    <label>
                        Información de la empresa
                    </label>
                    <ul className={styles.item}>
                        <li className={styles.grid}>
                            <b>
                                Email
                            </b>
                            <textarea
                                value={business.email}
                            />
                        </li>
                        <li className={styles.grid}>
                            <b>
                                Teléfono
                            </b>
                            <textarea
                                value={business.phone}
                            />
                        </li>
                        <li className={styles.grid}>
                            <b>
                                Sitio Web
                            </b>
                            <textarea
                                value={business.web}
                            />
                        </li>
                        <li>
                            <b>
                                Ciudad
                            </b>
                            <textarea
                                value={business.city}
                            />
                        </li>
                        <li>
                            <b>
                                Domicilio Social
                            </b>
                            <textarea
                                value={business.address}
                            />
                        </li>
                        <li>
                            <b>
                                Actividad CNAE
                            </b>
                            <textarea
                                value={business.cnae}
                            />

                        </li>
                        <li>
                            <b>
                                Objeto Social
                            </b>
                            <textarea
                                value={business.social}
                            />

                        </li>
                        <li>
                            <b>
                                Cáculo de la Facturación
                            </b>
                            <textarea
                                value={business.facture}
                            />
                        </li>
                        <li>
                            <b>
                                CIF
                            </b>
                            <textarea
                                value={business.cif}
                            />
                        </li>
                        <li>
                            <b>
                                Fecha de Constitución
                            </b>
                            <textarea
                                value={business.date}
                            />
                        </li>
                        <li>
                            <b>
                                Forma Jurídica
                            </b>
                            <textarea
                                value={business.society}
                            />
                        </li>
                        <li>
                            <b>
                                Socios y Fundadores
                            </b>
                            <textarea
                                value={business.partner}
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}



const LabelSelect = ({ text }) => {
    // product
    // piority
    // default
    return (
        <div>
            status
            <IconArrow />
            <ul>
                {[""].map((item, index) => (
                    <li>
                        -----
                    </li>
                ))}
            </ul>
        </div>
    )
}