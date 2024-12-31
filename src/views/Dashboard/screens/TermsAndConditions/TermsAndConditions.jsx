import React from 'react';
import styles from './TermsAndConditions.module.css';
import Navbar from '../../components/Navbar/Navbar';

const TermsAndConditions = () => {
  return (
    <div className={styles.main}>
      <Navbar />
      <article className={styles.article}>
        <header>
          <h2>Términos de Uso</h2>
          <span>Vigentes desde: 1 de enero de 2025</span>
          <p>¡Gracias por usar FacturaGPT!</p>
        </header>

        <section>
          <p>
            Estos Términos de Uso se aplican al uso de FacturaGPT y otros
            servicios para individuos, junto con cualquier aplicación de
            software y sitios web asociados (en conjunto, los “Servicios”).
            Estos Términos forman un acuerdo entre usted y Aythen, incluyen
            nuestras Condiciones del Servicio y disposiciones importantes para
            resolver disputas mediante arbitraje. Al usar nuestros Servicios,
            acepta estos Términos.
          </p>
          <p>
            Si reside en el Área Económica Europea, Suiza o el Reino Unido, su
            uso de los Servicios se rige por estos términos.
          </p>
          <p>
            Nuestras Condiciones Comerciales rigen el uso de FacturaGPT
            Enterprise, nuestras API y otros servicios para empresas y
            desarrolladores.
          </p>
          <p>
            Nuestra Política de Privacidad explica cómo recopilamos y usamos la
            información personal. Aunque no forma parte de estos Términos, es un
            documento importante que debe leer.
          </p>
        </section>

        <section>
          <h3>Quiénes Somos</h3>
          <p>
            Aythen es una empresa de desarrollo de software. Nuestra misión es
            mejorar el proceso empresarial en todo el mundo. <br />
            Para más información sobre nosotros, visite:{' '}
            <a
              href='https://www.facturagpt.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              https://www.facturagpt.com
            </a>
          </p>
        </section>

        <section>
          <h3>Política de Privacidad </h3>
          <p>
            La Política de Privacidad de FacturaGPT detalla cómo recopilamos,
            usamos, almacenamos y protegemos su información personal.
            <ul>
              <li>
                Recopilación de Información: Recopilamos información
                proporcionada por usted al registrarse, interactuar con nuestros
                Servicios o comunicarse con nosotros. Esto incluye datos de
                contacto (nombre, correo electrónico, teléfono), información
                financiera (métodos de pago y datos de facturación) e
                información técnica (dirección IP, tipo de dispositivo, datos de
                uso de la aplicación).
              </li>
              <li>
                Uso de la Información: Utilizamos sus datos para:
                <ul>
                  <li>Operar y mantener los Servicios.</li>
                  <li>Procesar pagos y gestionar suscripciones.</li>
                  <li>Personalizar su experiencia de usuario.</li>
                  <li>Mejorar y desarrollar nuevas funcionalidades.</li>
                  <li>Cumplir con obligaciones legales.</li>
                </ul>
              </li>
              <li>
                Protección de Datos: Implementamos medidas de seguridad técnicas
                (como cifrado de datos) y organizativas (control de acceso y
                capacitación del personal) para proteger su información contra
                accesos no autorizados, pérdidas o alteraciones.
              </li>
              <li>
                Retención de Datos: Conservamos sus datos solo durante el tiempo
                necesario para prestar los Servicios, cumplir con nuestras
                obligaciones legales o resolver disputas.
              </li>
              <li>
                Cancelación de la Suscripción: Si decide cancelar su
                suscripción:
                <ul>
                  <li>
                    Su información permanecerá en nuestros sistemas el tiempo
                    necesario para cumplir con nuestras obligaciones legales y
                    permitir una posible reactivación.
                  </li>
                  <li>
                    Puede solicitar la eliminación completa de sus datos, salvo
                    que existan razones legales para retenerlos.
                  </li>
                </ul>
              </li>
              <li>
                Compartición de Información: Compartimos su información personal
                exclusivamente:
                <ul>
                  <li>
                    Con proveedores de servicios de confianza para procesar
                    pagos, almacenar datos o prestar soporte técnico.
                  </li>
                  <li>
                    Cuando la ley lo exija o para proteger nuestros derechos
                    legales.
                  </li>
                </ul>
              </li>
              <li>
                Sus Derechos: Usted tiene derecho a:
                <ul>
                  <li>Acceder a sus datos personales.</li>
                  <li>Solicitar la corrección o eliminación de sus datos.</li>
                  <li>
                    Limitar el tratamiento de sus datos o retirar su
                    consentimiento.
                  </li>
                </ul>
              </li>
              <li>
                Transferencias Internacionales de Datos: Si sus datos se
                transfieren fuera de su región, implementamos medidas adecuadas
                para garantizar su protección, como el uso de cláusulas
                contractuales tipo.
              </li>
            </ul>
          </p>
        </section>
        <section>
          <h3>Política de Cookies</h3>
          <p>
            FacturaGPT utiliza cookies para optimizar su experiencia y mejorar
            los Servicios.
            <ul>
              <li>
                Qué son las cookies: Pequeños archivos de texto almacenados en
                su dispositivo que recopilan información sobre su navegación.
              </li>
              <li>
                Tipos de cookies utilizadas:
                <ul>
                  <li>
                    Cookies esenciales: Necesarias para el funcionamiento del
                    sitio.
                  </li>
                  <li>
                    Cookies analíticas: Ayudan a mejorar el rendimiento y
                    funcionalidad del sitio.
                  </li>
                  <li>
                    Cookies publicitarias: Personalizan anuncios basados en sus
                    intereses.
                  </li>
                </ul>
              </li>
              Gestión de cookies: Puede ajustar las preferencias de cookies a
              través de la configuración de su navegador.
              <li></li>
              Política de retención: Las cookies se eliminan automáticamente
              después de un período de tiempo específico, dependiendo de su
              propósito.
              <li></li>
            </ul>
          </p>
        </section>

        <section>
          <h3>Condiciones de Uso y Contratos</h3>
          <p>
            {' '}
            <ul>
              <li>
                Condiciones de la Cuenta:
                <ul>
                  <li>
                    Para acceder al servicio, es imprescindible ser mayor de
                    dieciséis años. Se debe proporcionar un nombre legal
                    completo, una dirección de correo electrónico y toda la
                    información requerida por FacturaGPT en el proceso de
                    creación de la cuenta. Es responsabilidad del usuario
                    proporcionar información veraz. También es responsable de
                    todas las actividades realizadas bajo su cuenta. Si crea una
                    cuenta o utiliza los Servicios en nombre de otra persona o
                    entidad, debe tener la autoridad para aceptar estos Términos
                    en su nombre. FacturaGPT se reserva el derecho de eliminar
                    cualquier cuenta si se sospecha de su veracidad o pudiera
                    incumplir alguna de las normas de uso.
                  </li>
                </ul>
              </li>
              <li>
                Dominios Corporativos:
                <ul>
                  <li>
                    Si crea una cuenta con un correo corporativo, esta puede ser
                    añadida a la cuenta empresarial de la organización,
                    otorgando al administrador control sobre su cuenta,
                    incluyendo acceso a sus datos.
                  </li>
                </ul>
              </li>
            </ul>
          </p>
        </section>

        <section>
          <h3>Pago y Facturación</h3>
          <p>
            {' '}
            <ul>
              <li>
                Debe proporcionar información de facturación precisa y un método
                de pago válido.
              </li>
              <li>
                Las suscripciones pagadas se renuevan automáticamente hasta que
                las cancele. Para realizar los pagos, es necesario introducir en
                la cuenta una tarjeta bancaria válida.
              </li>
              <li>
                FacturaGPT cobrará periódicamente al usuario una tarifa
                recurrente dependiendo del tipo de cuenta contratada. El
                servicio será cobrado cada período por adelantado y no es
                reembolsable, salvo en los casos previstos en estas condiciones.
              </li>
              <li>
                En caso de impago, el acceso al servicio será suspendido y los
                datos se eliminarán en un plazo de treinta (30) días a partir de
                la fecha de incumplimiento.
              </li>
            </ul>
          </p>
        </section>

        <section>
          <h3>Modificaciones del Servicio y de los Planes</h3>
          <p>
            FacturaGPT se reserva el derecho de modificar o suspender, temporal
            o permanentemente, el servicio en cualquier momento y por cualquier
            motivo si lo considera conveniente, con o sin previo aviso.
          </p>
        </section>
      </article>
    </div>
  );
};

export default TermsAndConditions;
