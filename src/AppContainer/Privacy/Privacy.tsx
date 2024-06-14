import { observer } from "mobx-react-lite";

export const Privacy = observer(function Privacy(): JSX.Element {
  return (
    <div className="container column start">
      <div>
        <div className="m-b-10">
          <h2>Politique de Confidentialité</h2>
          <h3 className="flex m-b-0">1. Introduction</h3>
          <p>
            La protection de vos données personnelles est une priorité pour [Nom
            de l'entreprise]. Cette politique de confidentialité décrit les
            types de données personnelles que nous collectons, comment nous les
            utilisons et les mesures que nous prenons pour les protéger.
          </p>
        </div>

        <div className="m-b-10">
          <h3 className="flex m-b-0">2. Collecte des Données Personnelles</h3>
          <p>
            Nous collectons différentes catégories de données personnelles
            lorsque vous utilisez notre site web, notamment :
          </p>
          <ul>
            <li>
              Informations de contact (nom, adresse e-mail, numéro de téléphone)
            </li>
            <li>Informations de connexion (identifiant, mot de passe)</li>
            <li>
              Informations de navigation (adresses IP, type de navigateur, pages
              visitées)
            </li>
            <li>Autres informations que vous choisissez de nous fournir</li>
          </ul>
        </div>

        <div className="m-b-10">
          <h3 className="flex m-b-0">
            3. Utilisation des Données Personnelles
          </h3>
          <p>Nous utilisons vos données personnelles pour :</p>
          <ul>
            <li>Fournir et gérer nos services</li>
            <li>Communiquer avec vous</li>
            <li>Améliorer notre site web et nos services</li>
            <li>Personnaliser votre expérience utilisateur</li>
            <li>Respecter nos obligations légales</li>
          </ul>
        </div>

        <div className="m-b-10">
          <h3 className="flex m-b-0">4. Partage des Données Personnelles</h3>
          <p>
            Nous ne vendons ni ne louons vos données personnelles à des tiers.
            Nous pouvons partager vos données personnelles avec :
          </p>
          <ul>
            <li>
              Nos partenaires de confiance qui nous aident à fournir nos
              services
            </li>
            <li>Les autorités légales, si requis par la loi</li>
            <li>
              Des tiers, en cas de fusion, acquisition ou vente de nos actifs
            </li>
          </ul>
        </div>

        <div className="m-b-10">
          <h3 className="flex m-b-0">5. Sécurité des Données Personnelles</h3>
          <p>
            Nous mettons en œuvre des mesures de sécurité techniques et
            organisationnelles pour protéger vos données personnelles contre
            tout accès non autorisé, modification, divulgation ou destruction.
          </p>
        </div>

        <div className="m-b-10">
          <h3 className="flex m-b-0">6. Vos Droits</h3>
          <p>
            Conformément à la législation en vigueur, vous disposez des droits
            suivants concernant vos données personnelles :
          </p>
          <ul>
            <li>Droit d'accès</li>
            <li>Droit de rectification</li>
            <li>Droit de suppression</li>
            <li>Droit d'opposition</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité des données</li>
          </ul>
          <p>
            Pour exercer ces droits, vous pouvez nous contacter à l'adresse
            suivante : [adresse e-mail].
          </p>
        </div>

        <div className="m-b-10">
          <h3 className="flex m-b-0">7. Cookies</h3>
          <p>
            Nous utilisons des cookies pour améliorer votre expérience sur notre
            site. Vous pouvez configurer votre navigateur pour refuser les
            cookies, mais cela pourrait limiter votre accès à certaines
            fonctionnalités du site.
          </p>

          <div className="m-b-10">
            <h3 className="flex m-b-0">
              8. Modifications de la Politique de Confidentialité
            </h3>
            <p>
              Nous nous réservons le droit de modifier cette politique de
              confidentialité à tout moment. Les modifications seront publiées
              sur cette page et entreront en vigueur dès leur publication.
            </p>
          </div>

          <div className="m-b-10">
            <h3 className="flex m-b-0">9. Contact</h3>
            <p>
              Pour toute question concernant cette politique de confidentialité,
              vous pouvez nous contacter à l'adresse suivante : [adresse
              e-mail].
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
