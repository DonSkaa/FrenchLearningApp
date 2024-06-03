import { observer } from "mobx-react-lite";

export const Terms = observer(function Terms(): JSX.Element {
  return (
    <div className="full-width flex column m-4">
      <div>
        <h2>Conditions Générales d'Utilisation</h2>
        <div className="m-b-10">
          <h3 className="flex m-b-0">1. Introduction</h3>
          <p>
            Les présentes conditions générales d'utilisation (CGU) régissent
            l'utilisation de notre site web et de nos services. En accédant ou
            en utilisant notre site, vous acceptez de vous conformer aux
            présentes conditions.
          </p>
        </div>

        <div className="m-b-10">
          <h3 className="flex m-b-0">2. Définitions</h3>
          <p>
            <strong>Utilisateur :</strong> désigne toute personne accédant et
            utilisant le site.
          </p>
        </div>
        <p>
          <strong>Site :</strong> désigne notre site web accessible à l'adresse
          [adresse du site].
        </p>
      </div>

      <div className="m-b-10">
        <h3 className="flex m-b-0">3. Accès au site</h3>
        <p>
          L'accès au site est gratuit. Les frais d'accès et d'utilisation du
          réseau de télécommunication sont à la charge de l'utilisateur, selon
          les modalités fixées par ses fournisseurs d'accès et opérateurs de
          télécommunication.
        </p>
      </div>

      <div className="m-b-10">
        <h3 className="flex m-b-0">4. Propriété intellectuelle</h3>
        <p>
          Tous les contenus présents sur le site (textes, images, graphismes,
          logo, etc.) sont protégés par le droit de la propriété intellectuelle
          et sont la propriété exclusive de [nom de l'entreprise]. Toute
          reproduction, distribution, modification ou utilisation de ces
          contenus sans autorisation préalable est strictement interdite.
        </p>
      </div>

      <div className="m-b-10">
        <h3 className="flex m-b-0">5. Données personnelles</h3>
        <p>
          Nous nous engageons à protéger la vie privée de nos utilisateurs
          conformément aux lois en vigueur. Les informations personnelles
          collectées sur le site sont utilisées exclusivement par [nom de
          l'entreprise] pour la gestion de la relation utilisateur. Vous
          disposez d'un droit d'accès, de rectification et de suppression de vos
          données personnelles en nous contactant à l'adresse [adresse e-mail].
        </p>
      </div>

      <div className="m-b-10">
        <h3 className="flex m-b-0">6. Responsabilité</h3>
        <p>
          Nous nous efforçons d'assurer l'exactitude et la mise à jour des
          informations diffusées sur le site. Toutefois, nous ne pouvons
          garantir l'exactitude, la complétude ou l'actualité des informations
          fournies. [Nom de l'entreprise] ne saurait être tenue responsable des
          erreurs ou omissions, ainsi que des dommages résultant de
          l'utilisation de ces informations.
        </p>
      </div>

      <div className="m-b-10">
        <h3 className="flex m-b-0">7. Liens externes</h3>
        <p>
          Le site peut contenir des liens vers des sites tiers. Nous n'exerçons
          aucun contrôle sur le contenu de ces sites et déclinons toute
          responsabilité quant aux informations qui y sont présentées. L'accès
          et l'utilisation de ces sites se font sous votre propre
          responsabilité.
        </p>
      </div>

      <div className="m-b-10">
        <h3 className="flex m-b-0">8. Modification des CGU</h3>
        <p>
          Nous nous réservons le droit de modifier les présentes CGU à tout
          moment. Les modifications entreront en vigueur dès leur publication
          sur le site. Il est de votre responsabilité de consulter régulièrement
          les CGU pour prendre connaissance des éventuelles modifications.
        </p>
      </div>

      <div className="m-b-10">
        <h3 className="flex m-b-0">9. Droit applicable</h3>
        <p>
          Les présentes CGU sont régies par le droit français. En cas de litige,
          les tribunaux français seront seuls compétents.
        </p>
      </div>

      <div className="m-b-10">
        <h3 className="flex m-b-0">10. Contact</h3>
        <p>
          Pour toute question relative aux présentes CGU, vous pouvez nous
          contacter à l'adresse suivante : [adresse e-mail].
        </p>
      </div>
    </div>
  );
});
