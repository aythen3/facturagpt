import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import {
    fetchLeads,
    saveLeads
} from '../../../../actions/reseller'
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


const rewards = [
    {
        text: "Primera llamada 2 min",
        value: 0.1,
        img: Img01,
        active: true
    },
    {
        text: "Agengar nueva cita con responsable",
        value: 0.2,
        img: Img02,
        active: true
    },
    {
        text: "Explicar producto 5m demo",
        value: 0.3,
        img: Img030,
        active: false
    },
    {
        text: "Respuesta email",
        value: 0.3,
        img: Img031,
        active: false
    },
    {
        text: "Registro en la plataforma",
        value: 0.3,
        img: Img032,
        active: false
    },
    {
        text: "+20 documentos",
        value: 1,
        img: Img01,
        active: false
    },
    {
        text: "+200 documentos",
        value: 5,
        img: Img5,
        active: false
    },
    {
        text: "+500 documentos",
        value: 10,
        img: Img10,
        active: false
    },
    {
        text: "+1.000 documentos",
        value: 25,
        img: Img25,
        active: false
    },
    {
        text: "+2.000 documentos",
        value: 50,
        img: Img50,
        active: false
    },
    {
        text: "+5.000 documentos",
        value: 100,
        img: Img100,
        active: false
    },
    {
        text: "+20.000 documentos",
        value: 250,
        img: Img250,
        active: false
    },
    {
        text: "+50.000 documentos",
        value: 500,
        img: Img500,
        active: false
    },
    {
        text: "+100.000 documentos",
        value: 1000,
        img: Img1000,
        active: false
    }
];



let business = {
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


const leads = [
    business,
    business,
    business
]


const Reseller = () => {
    const dispatch = useDispatch()
    const [isCalling, setIsCalling] = useState(false)


    const fetchItems = async() => {
        const resp = await dispatch(fetchLeads({
            query: '',
            category: ''
        }))
        console.log('resp!!!', resp)
    }

    useEffect(() => {
        fetchItems()
    }, [])

    const handleDragOver = (e) => {
        e.preventDefault();
    };



    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];

        if (file.type !== 'text/csv') {
            alert('Por favor, sube solo archivos CSV');
            return;
        }

        const reader = new FileReader();
        reader.onload = async (event) => {
            const csvData = event.target.result;
            const lines = csvData.split('\n');


            // Get only first 26 rows (header + 25 data rows)
            const limitedLines = lines.slice(0, 26);



            const headerMapping = {
                'email': ['email', 'correo', 'e-mail'],
                'phone': ['phone', 'telefono', 'teléfono', 'tel'],
                'web': ['web', 'website', 'sitio web', 'página web'],
                'city': ['city', 'ciudad', 'localidad'],
                'address': ['address', 'direccion', 'dirección', 'domicilio'],
                'cnae': ['cnae', 'actividad cnae'],
                'social': ['social', 'objeto social'],
                'facture': ['facture', 'facturación', 'facturacion'],
                'cif': ['cif', 'nif', 'identificación fiscal'],
                'date': ['date', 'fecha', 'fecha constitución'],
                'society': ['society', 'forma jurídica', 'tipo sociedad'],
                'partner': ['partner', 'socios', 'fundadores']
            };

            // Function to normalize header text
            const normalizeHeader = (header) => {
                header = header.toLowerCase().trim();
                for (const [key, variants] of Object.entries(headerMapping)) {
                    if (variants.includes(header)) {
                        return key;
                    }
                }
                return header;
            };



            // Get headers from first row
            const headers = limitedLines[0].split(',').map(header => {
                const cleanHeader = header.replace(/['"]/g, '').trim();
                // return cleanHeader;
                return normalizeHeader(cleanHeader);
            });

            // Process remaining rows
            const jsonData = limitedLines.slice(1).map(line => {
                // Handle quoted values
                // const withoutEscapedQuotes = line.replace(/\\"/g, '@QUOTE@');
                // const withoutQuotes = withoutEscapedQuotes.replace(/^"|"$/g, '');
                // const restoredQuotes = withoutQuotes.replace(/@QUOTE@/g, '"');
                // const columns = restoredQuotes.split(',').map(col => col.trim());

                const columns = line.split(',').map(col => col.replace(/['"\\]/g, '').trim());

                // Create object using headers as keys
                return headers.reduce((obj, header, index) => {
                    obj[header] = columns[index] || '';
                    return obj;
                }, {});
            });

            console.log('Processed data:', jsonData);


            const resp = await dispatch(saveLeads({
                leads: jsonData
            }))

            console.log('save', resp)
        };

        reader.readAsText(file);
    };

    return (
        <div className={styles.containerReseller}>
            <ComponentHeader />
            <div
                className={styles.container}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <ComponentLeft
                    isCalling={isCalling}
                />
                <ComponentRight
                    isCalling={isCalling}
                    setIsCalling={setIsCalling}
                />
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


    // Datos para el gráfico
    const data = {
        labels: ['Barra 1', 'Barra 2'],
        series: [[30], [70]]
    };

    // Opciones del gráfico
    const options = {
        high: 100, // Valor máximo del eje Y (para mostrar porcentajes)
        low: 0,    // Valor mínimo del eje Y
        axisY: {
            onlyInteger: true
        }
    };

    // CSS personalizado para los colores de las barras
    const customStyles = `
    .ct-series-a .ct-bar {
      stroke: #2196F3; /* Color azul para la primera barra */
    }
    .ct-series-b .ct-bar {
      stroke: #FF5722; /* Color naranja para la segunda barra */
    }
  `;

    // Agregar los estilos al documento
    const styleSheet = document.createElement('style');
    styleSheet.innerText = customStyles;
    document.head.appendChild(styleSheet);

    // Crear el gráfico
    new Chartist.Bar('.ct-chart', data, options);


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
                <div class="ct-chart ct-perfect-fourth"></div>
                ----
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


const ComponentLeft = ({ isCalling }) => {
    const [isComponent, setIsComponent] = useState('pendent')

    return (
        <div className={styles.componentLeft}>

            {isCalling ? (
                <>
                    {isComponent == 'pendent' ? (
                        <div className={styles.box}>
                            <div className={styles.header}>
                                <div
                                    onClick={() => setIsComponent('calling')}
                                    className={styles.title}
                                >
                                    <div>
                                        <IconCall />
                                        Pendientes
                                        <IconArrow />
                                    </div>
                                    <span>
                                        256
                                    </span>
                                </div>
                                <div className={styles.search}>
                                    <IconSearch />
                                    <input
                                        value="Search"
                                    />
                                    <button>
                                        <IconSearch />
                                    </button>
                                </div>
                            </div>
                            <div className={styles.filter}>
                                <div>
                                    <LabelSelect
                                        text={"Status"}
                                        items={[{
                                            text: "hello",
                                            value: "01"
                                        }, {
                                            text: "hello",
                                            value: "01"
                                        }]}
                                    />
                                    <LabelSelect
                                        text={"Product"}
                                        items={[{
                                            text: "hello",
                                            value: "01"
                                        }, {
                                            text: "hello",
                                            value: "01"
                                        }]}
                                    />
                                    <LabelSelect
                                        text={"Priority"}
                                        items={[{
                                            text: "hello",
                                            value: "01"
                                        }, {
                                            text: "hello",
                                            value: "01"
                                        }]}
                                    />
                                </div>
                                <div>
                                    <IconAlign />
                                    default
                                </div>
                            </div>
                            <ul className={styles.itemsLeads}>
                                {leads.map((item, index) => (
                                    <li key={index} className={`${index == 0 ? styles.active : ''}`}>
                                        <div className={styles.title}>
                                            Emprsesa0
                                        </div>
                                        <div className={styles.status}>
                                            <IconArrow />
                                            High
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    ) : isComponent == 'calling' ? (

                        <div className={styles.box}>
                            <div
                                className={styles.header}
                                onClick={() => setIsComponent('pendent')}
                            >
                                <div className={styles.title}>
                                    <IconCall />
                                    LLamadas
                                    <IconArrow />
                                </div>
                                256
                            </div>
                            <ul className={styles.itemsCall}>
                                {[""].map((item, index) => (
                                    <li key={index}>
                                        <div className={styles.top}>
                                            <b>
                                                Empresa 0
                                            </b>
                                            <div className={`${styles.status} 
                                    ${true ? styles.hight : styles.medium}
                                    `}>
                                                <IconArrow />
                                                High
                                            </div>
                                            <div className={styles.state}>
                                                No alcanzado
                                            </div>
                                        </div>
                                        <div className={styles.bottom}>
                                            <div className={styles.status}>
                                                <div className={styles.date}>
                                                    <IconDate />
                                                    21.02.2023
                                                </div>
                                                <div className={styles.clock}>
                                                    <IconClock />
                                                    11:30 AM
                                                </div>
                                                <div className={styles.time}>
                                                    00:31
                                                </div>
                                            </div>
                                            <div className={styles.ticket}>
                                                +0,00€
                                                <IconArrow />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : null}
                </>
            ) : (
                <div
                    className={`
                ${styles.box}
                ${!isCalling ? styles.active : ''}
            `}
                >
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

                    <ul className={styles.itemsObjective}>
                        {rewards.map((item, index) => (
                            <li
                                key={index}
                                className={`${item.active ? styles.active : ''}`}
                            >
                                <IconDot />
                                <div className={styles.image}>
                                    <img
                                        // src={Img01} 
                                        src={item.img}
                                    />
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
                                        {item.text}
                                    </p>
                                </div>
                                <label>
                                    {item.value}
                                    €
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}




        </div>
    )
}




const ComponentRight = ({ isCalling, setIsCalling }) => {
    return (
        <div className={styles.componentRight}>
            {isCalling ? (
                <div className={styles.twilio}>

                    icon call
                    Empresa 1
                    00:20:30

                    icon call delete
                    icon call
                    <button
                        onClick={() => setIsCalling(false)}
                    >
                        icon silence
                    </button>
                </div>
            ) : (
                <div className={styles.twilio}>
                    <div className={styles.buttons}>
                        <button className={styles.pause}>
                            <IconPause />
                        </button>
                        <button
                            className={styles.play}
                            onClick={() => setIsCalling(true)}
                        >
                            <IconPlay />
                        </button>
                        <button className={styles.renaud}>
                            <IconRenaud />
                        </button>
                    </div>
                    <span>
                        02:02:02
                    </span>
                </div>
            )}

            <div className={styles.containerRight}>

                <div className={styles.business}>
                    <div className={styles.titleHeader}>
                        <label>
                            Empresa1
                        </label>
                    </div>
                    <div className={styles.status}>
                        <div>
                            <IconDot />
                            No se logro alcanzar
                        </div>
                        <div className={4}>
                            <IconArrow />
                            High priority
                        </div>
                    </div>
                </div>

                <div className={styles.buttons}>
                    <div className={styles.call}>
                        <IconCall />
                        Call
                    </div>
                    <div>
                        <IconCall />
                        Mail
                    </div>
                </div>


                <div className={styles.boxBusiness}>
                    <div className={styles.items}>
                        <div>
                            <label>
                                Cuenta
                            </label>
                            <ul>
                                <li>
                                    <IconCall />
                                    Not found
                                    Alta nuevo cliente
                                </li>
                                <li>
                                    <IconCall />
                                    Registrado coolmain@gmail.com
                                </li>
                            </ul>
                        </div>
                        <div className={styles.methodPayment}>
                            <label>
                                Método de Pago
                            </label>
                            <ul>
                                <li>
                                    <IconCall />
                                    <b>
                                        Not found
                                    </b>
                                </li>
                                <li>
                                    <IconCall />
                                    <b>
                                        ***0000
                                    </b>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


                <div className={styles.boxBusiness}>
                    <label>
                        Next Meeting
                    </label>
                    <ul className={styles.items}>
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
                <div className={styles.boxInfo}>
                    <label>
                        Información de la empresa
                    </label>
                    <ul className={styles.itemsInfo}>
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



const LabelSelect = ({ text, items }) => {
    const [isActive, setIsActive] = useState(false)


    const onActive = () => {
        setIsActive(!isActive)
    }

    return (
        <div
            className={`${styles.select} ${isActive ? styles.active : ''}`}
            onClick={onActive}
        >
            <span>
                {text}
            </span>
            <IconArrow />
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.text}
                        {item.value}
                    </li>
                ))}
            </ul>
        </div>
    )
}