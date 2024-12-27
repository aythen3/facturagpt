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
            uso de los Servicios se rige por estos términos. Nuestras
            Condiciones Comerciales rigen el uso de FacturaGPT Enterprise,
            nuestras API y otros servicios para empresas y desarrolladores.
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
            mejorar el proceso empresarial en todo el mundo. Para más
            información sobre nosotros, visite:{' '}
            <a
              href='https://www.aythen.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              https://www.aythen.com
            </a>
          </p>
        </section>

        <section>
          <h3>Registro y Acceso</h3>
          <h4>Edad Mínima</h4>
          <p>
            Debe tener al menos 16 años o la edad mínima requerida en su país
            para consentir el uso de los Servicios. Si es menor de 18 años, debe
            contar con el permiso de su padre, madre o tutor legal.
          </p>

          <h4>Registro</h4>
          <p>
            Debe proporcionar información precisa y completa para registrarse y
            usar nuestros Servicios. No puede compartir sus credenciales ni
            hacer que su cuenta esté disponible para otros. Es responsable de
            todas las actividades realizadas bajo su cuenta. Si crea una cuenta
            o utiliza los Servicios en nombre de otra persona o entidad, debe
            tener la autoridad para aceptar estos Términos en su nombre.
          </p>
        </section>

        <section>
          <h3>Uso de Nuestros Servicios</h3>
          <h4>Qué Puede Hacer</h4>
          <p>
            Sujeto a su cumplimiento con estos Términos, puede acceder y usar
            nuestros Servicios, cumpliendo con todas las leyes aplicables y
            cualquier otra documentación, guía o política proporcionada.
          </p>

          <h4>Qué No Puede Hacer</h4>
          <ul>
            <li>
              Usar los Servicios de manera que infrinja derechos de terceros.
            </li>
            <li>Modificar, copiar, vender o distribuir nuestros Servicios.</li>
            <li>
              Intentar o ayudar a descompilar, realizar ingeniería inversa o
              descubrir el código fuente.
            </li>
            <li>Extraer datos automáticamente o programáticamente.</li>
          </ul>
        </section>

        <section>
          <h3>Dominios Corporativos</h3>
          <p>
            Si crea una cuenta con un correo corporativo, esta puede ser añadida
            a la cuenta empresarial de la organización, otorgando al
            administrador control sobre su cuenta.
          </p>
        </section>

        <section>
          <h3>Servicios de Terceros</h3>
          <p>
            Los Servicios pueden incluir software, productos o servicios de
            terceros, sujetos a sus propios términos. No somos responsables por
            ellos.
          </p>
        </section>

        <section>
          <h3>Comentarios</h3>
          <p>
            Valoramos sus comentarios y podemos utilizarlos sin restricciones ni
            compensación.
          </p>
        </section>

        <section>
          <h3>Exactitud</h3>
          <p>
            La inteligencia artificial evoluciona rápidamente. El uso de los
            Servicios podría generar resultados que no reflejen datos reales.
            Usted acepta evaluar la precisión y adecuación del contenido
            generado antes de usarlo o compartirlo.
          </p>
        </section>

        <section>
          <h3>Nuestros Derechos de Propiedad Intelectual</h3>
          <p>
            Somos propietarios de todos los derechos sobre los Servicios. Solo
            puede usar nuestro nombre y logotipo conforme a nuestras Guías de
            Marca.
          </p>
        </section>

        <section>
          <h3>Cuentas de Pago</h3>
          <h4>Facturación</h4>
          <p>
            Debe proporcionar información de facturación precisa y un método de
            pago válido. Las suscripciones pagadas se renuevan automáticamente
            hasta que las cancele.
          </p>

          <h4>Cancelación</h4>
          <p>
            Puede cancelar su suscripción en cualquier momento. Los pagos no son
            reembolsables salvo que la ley lo requiera.
          </p>
        </section>

        <section>
          <h3>Cambios</h3>
          <p>
            Podemos cambiar los precios. Si aumentamos tarifas, le notificaremos
            con 30 días de antelación antes de la renovación.
          </p>
        </section>

        <section>
          <h3>Terminación y Suspensión</h3>
          <h4>Terminación</h4>
          <p>
            Puede dejar de usar los Servicios en cualquier momento. Podemos
            suspender o terminar su acceso si:
            <ul>
              <li>Incumple estos Términos o nuestras Políticas de Uso.</li>
              <li>La ley lo requiere.</li>
              <li>Su uso puede causar daños o riesgos.</li>
            </ul>
          </p>
        </section>

        <section>
          <h3>Apelaciones</h3>
          <p>
            Si cree que su cuenta fue suspendida o terminada por error, puede
            apelar contactando al soporte.
          </p>
        </section>

        <section>
          <h3>Exclusión de Garantías</h3>
          <p>
            NUESTROS SERVICIOS SE PROPORCIONAN "TAL CUAL". NO OFRECEMOS
            GARANTÍAS EXPRESAS O IMPLÍCITAS, SALVO DONDE LA LEY LO EXIJA.
          </p>
        </section>

        <section>
          <h3>Limitación de Responsabilidad</h3>
          <p>
            NO SOMOS RESPONSABLES DE DAÑOS INDIRECTOS, INCIDENTALES O
            CONSECUENCIALES DERIVADOS DEL USO DE LOS SERVICIOS. <br />
            Términos Generales
            <ul>
              <li>
                <strong>Cesión:</strong> No puede transferir sus derechos bajo
                estos Términos sin nuestro consentimiento.
              </li>
              <li>
                <strong>Ley Aplicable:</strong> Estos Términos se rigen por las
                leyes de Barcelona, España.
              </li>
            </ul>
          </p>
        </section>
      </article>
    </div>
  );
};

export default TermsAndConditions;
