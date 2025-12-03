# Contenu légal pour ChatWithVera

Ce document contient tous les contenus HTML légaux générés pour l'application ChatWithVera.

---

## 1. === Politique de confidentialité (HTML) ===

```html
<main>
  <article>
    <header>
      <h1>Politique de confidentialité</h1>
      <p><strong>Date de dernière mise à jour :</strong> [Date]</p>
    </header>

    <section>
      <h2>1. Introduction</h2>
      <p>
        La présente politique de confidentialité vous informe sur la manière dont nous collectons, traitons, 
        utilisons et protégeons vos données à caractère personnel dans le cadre de l'utilisation de l'application 
        <strong>ChatWithVera</strong>. Nous nous engageons à respecter le Règlement général sur la protection 
        des données (RGPD) ainsi que la législation française en vigueur.
      </p>
      <p>
        ChatWithVera est un projet développé dans un contexte pédagogique par des étudiants de 
        <strong>[Nom de l'établissement]</strong>. L'application pourrait à terme devenir la plateforme officielle 
        de l'association gérant le service VERA (service de vérification des faits).
      </p>
    </section>

    <section>
      <h2>2. Responsable du traitement</h2>
      <p>Le responsable du traitement des données personnelles est :</p>
      <address>
        <strong>[Nom du responsable]</strong><br>
        [Nom de l'établissement]<br>
        [Adresse postale complète]<br>
        Email : <a href="mailto:[Email de contact]">[Email de contact]</a>
      </address>
      <p>
        Pour toute question relative à la protection de vos données personnelles ou pour exercer vos droits, 
        vous pouvez nous contacter à l'adresse email ci-dessus.
      </p>
    </section>

    <section>
      <h2>3. Données personnelles collectées et traitées</h2>
      
      <h3>3.1. Comptes administrateurs</h3>
      <p>
        L'application dispose de comptes administrateurs créés manuellement en base de données. 
        Ces comptes permettent d'accéder à un tableau de bord sécurisé réservé à l'équipe du projet.
      </p>
      <p>Les données collectées pour ces comptes incluent :</p>
      <ul>
        <li><strong>Identifiant unique</strong> (généré automatiquement)</li>
        <li><strong>Nom d'utilisateur</strong></li>
        <li><strong>Adresse email</strong></li>
        <li><strong>Mot de passe hashé</strong> (jamais stocké en clair)</li>
        <li><strong>Rôle</strong> (administrateur)</li>
        <li><strong>Éventuelles requêtes associées</strong> (non utilisé actuellement)</li>
      </ul>

      <h3>3.2. Données de navigation et analytics</h3>
      <p>
        Afin d'améliorer nos services et de mieux comprendre l'utilisation de notre application, nous collectons 
        des données de navigation via <strong>Vercel Analytics</strong>. Ces données peuvent inclure :
      </p>
      <ul>
        <li>Adresse IP (potentiellement anonymisée)</li>
        <li>Type de navigateur et version</li>
        <li>Système d'exploitation</li>
        <li>Pages visitées et durée de visite</li>
        <li>Date et heure d'accès</li>
        <li>Identifiants techniques (user-agent)</li>
      </ul>
      <p>
        Ces données sont collectées à des fins statistiques uniquement et ne font l'objet d'aucun profilage publicitaire.
      </p>

      <h3>3.3. Données stockées localement (navigateur)</h3>
      <p>
        Lors de votre utilisation de ChatWithVera, certaines données sont stockées localement dans votre navigateur 
        via le mécanisme de <strong>localStorage</strong> :
      </p>
      <ul>
        <li><strong>Token d'authentification</strong> (JWT, valide environ 1 heure)</li>
        <li><strong>Adresse email</strong> de l'utilisateur connecté</li>
        <li><strong>Rôle</strong> de l'utilisateur</li>
        <li><strong>Préférence de thème</strong> (interface claire ou sombre)</li>
      </ul>
      <p>
        Ces données persistent dans votre navigateur jusqu'à déconnexion ou jusqu'à ce que vous effaciez 
        manuellement le stockage de votre navigateur. Vous pouvez gérer ces données via les paramètres 
        de votre navigateur.
      </p>

      <h3>3.4. Réponses au questionnaire de satisfaction</h3>
      <p>
        Le tableau de bord administrateur affiche des statistiques et des réponses textuelles issues d'un 
        questionnaire de satisfaction (Google Form) portant sur l'utilisation du service VERA sur Instagram.
      </p>
      <p>
        Ces réponses contiennent principalement des <strong>opinions, recommandations et retours d'expérience</strong>. 
        Elles ne contiennent normalement pas de données personnelles directes (nom, prénom, email). 
        Ces réponses sont stockées dans notre base de données et consultables uniquement par les administrateurs.
      </p>

      <h3>3.5. Messages et pièces jointes du chatbot</h3>
      <p>
        L'application ChatWithVera propose un service de chatbot accessible sans authentification (mode invité) 
        ou avec un compte administrateur. Les utilisateurs peuvent :
      </p>
      <ul>
        <li>Poser des questions textuelles</li>
        <li>Joindre des fichiers de tout type (documents PDF ou Word, images, audio, vidéo, etc.)</li>
      </ul>
      <p><strong>Important :</strong></p>
      <ul>
        <li>
          <strong>Notre application ne stocke pas les messages ni les pièces jointes</strong> dans notre base de données.
        </li>
        <li>
          Les messages et fichiers sont affichés temporairement dans l'interface de discussion. 
          <strong>Au rafraîchissement de la page, toute la conversation est perdue</strong>.
        </li>
        <li>
          Les messages et fichiers sont transmis depuis notre backend vers un workflow automatisé hébergé sur 
          un serveur privé (<strong>n8n</strong>), puis analysés via l'API <strong>Gemini de Google</strong>, 
          avant d'être envoyés au service externe <strong>VERA</strong> pour vérification des faits.
        </li>
        <li>
          Bien que nous ne conservions pas ces données, les prestataires externes (Google, VERA) peuvent 
          les traiter selon leurs propres politiques de confidentialité et éventuellement les conserver 
          de manière anonymisée.
        </li>
      </ul>

      <h3>3.6. Logs techniques</h3>
      <p>
        Des logs techniques peuvent être générés automatiquement par nos différents prestataires d'infrastructure :
      </p>
      <ul>
        <li><strong>Vercel</strong> (hébergement du frontend) : logs de compilation, requêtes HTTP</li>
        <li><strong>[Nom de l'hébergeur backend]</strong> (ex : Render) : logs d'infrastructure</li>
        <li><strong>n8n</strong> : logs d'erreurs du workflow (conservation limitée dans le temps)</li>
      </ul>
      <p>
        Ces logs sont conservés pour une durée limitée (généralement quelques jours à quelques semaines) 
        à des fins de maintenance technique et de résolution d'incidents.
      </p>
    </section>

    <section>
      <h2>4. Finalités du traitement</h2>
      <p>Nous traitons vos données personnelles pour les finalités suivantes :</p>
      <ul>
        <li>
          <strong>Gestion de l'authentification et sécurisation du tableau de bord</strong> : 
          permettre aux administrateurs d'accéder de manière sécurisée aux fonctionnalités réservées.
        </li>
        <li>
          <strong>Affichage de statistiques et de retours utilisateurs</strong> : 
          présenter aux administrateurs les données issues du questionnaire de satisfaction pour améliorer le service.
        </li>
        <li>
          <strong>Fonctionnement du chatbot et vérification des faits</strong> : 
          analyser les questions et fichiers des utilisateurs via Gemini, puis interroger le service VERA 
          pour fournir une réponse basée sur la vérification des faits.
        </li>
        <li>
          <strong>Amélioration de l'expérience utilisateur</strong> : 
          sauvegarder les préférences d'interface (thème clair/sombre) pour personnaliser l'affichage.
        </li>
        <li>
          <strong>Mesures d'audience et amélioration du service</strong> : 
          analyser l'utilisation de l'application via Vercel Analytics pour identifier les améliorations possibles, 
          sans profilage publicitaire.
        </li>
        <li>
          <strong>Sécurité et prévention des abus</strong> : 
          garantir la sécurité de l'application et prévenir toute utilisation frauduleuse ou abusive.
        </li>
      </ul>
    </section>

    <section>
      <h2>5. Base légale du traitement</h2>
      <p>Les traitements de données personnelles effectués reposent sur les bases légales suivantes :</p>
      <ul>
        <li>
          <strong>Exécution du contrat / fourniture du service</strong> (article 6.1.b du RGPD) : 
          le traitement est nécessaire pour vous fournir les services de ChatWithVera.
        </li>
        <li>
          <strong>Intérêt légitime</strong> (article 6.1.f du RGPD) : 
          sécurisation de l'application, amélioration de nos services, mesures d'audience.
        </li>
        <li>
          <strong>Consentement</strong> (article 6.1.a du RGPD) : 
          notamment pour l'envoi de fichiers au chatbot, matérialisé par l'acceptation explicite de l'avertissement 
          avant transmission des pièces jointes.
        </li>
      </ul>
    </section>

    <section>
      <h2>6. Destinataires des données</h2>
      <p>
        Vos données personnelles peuvent être transmises aux catégories de destinataires suivants, 
        dans la stricte limite de ce qui est nécessaire à l'accomplissement des finalités décrites :
      </p>
      <ul>
        <li>
          <strong>Personnel autorisé du projet ChatWithVera</strong> : 
          les administrateurs et membres de l'équipe de développement, dans le cadre de la gestion et 
          de la maintenance de l'application.
        </li>
        <li>
          <strong>Sous-traitants et prestataires techniques</strong> :
          <ul>
            <li><strong>MongoDB Atlas</strong> : stockage de la base de données (cluster hébergé en région Europe - Paris)</li>
            <li><strong>Vercel</strong> : hébergement du frontend et services d'analytics</li>
            <li><strong>[Nom de l'hébergeur backend]</strong> (ex : Render) : hébergement de l'API backend</li>
            <li><strong>Google (Gemini)</strong> : analyse des documents, images, audio et vidéos joints au chatbot</li>
            <li><strong>VERA</strong> : service externe d'intelligence artificielle pour la vérification des faits</li>
            <li><strong>n8n</strong> : workflow automatisé hébergé sur un serveur privé personnel</li>
          </ul>
        </li>
      </ul>
      <p>
        Tous nos prestataires sont soumis à des obligations de confidentialité et de sécurité. 
        Nous nous assurons qu'ils traitent vos données uniquement conformément à nos instructions et 
        dans le respect du RGPD.
      </p>
    </section>

    <section>
      <h2>7. Transferts de données hors de l'Union européenne</h2>
      <p>
        Certains de nos prestataires peuvent être situés ou utiliser des serveurs en dehors de l'Union européenne, 
        notamment :
      </p>
      <ul>
        <li>
          <strong>Google (Gemini)</strong> : Google peut traiter des données dans différents pays, 
          y compris hors de l'UE.
        </li>
        <li>
          <strong>Vercel</strong> : Vercel peut utiliser des infrastructures situées dans plusieurs régions, 
          y compris aux États-Unis.
        </li>
      </ul>
      <p>
        Lorsque des transferts de données hors UE sont effectués, nous nous assurons que des garanties appropriées 
        sont mises en place, conformément aux articles 44 et suivants du RGPD. Ces garanties peuvent inclure :
      </p>
      <ul>
        <li>Les <strong>clauses contractuelles types</strong> approuvées par la Commission européenne</li>
        <li>Les <strong>mécanismes de certification</strong> reconnus</li>
        <li>Les <strong>politiques de confidentialité</strong> des prestataires conformes au RGPD</li>
      </ul>
      <p>
        Nous vous encourageons à consulter les politiques de confidentialité de nos principaux prestataires :
      </p>
      <ul>
        <li>Google : <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a></li>
        <li>Vercel : <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">https://vercel.com/legal/privacy-policy</a></li>
      </ul>
    </section>

    <section>
      <h2>8. Durée de conservation des données</h2>
      <p>Nous conservons vos données personnelles pendant les durées suivantes :</p>
      <ul>
        <li>
          <strong>Comptes administrateurs</strong> : 
          conservés jusqu'à la fin du projet scolaire ou jusqu'à demande de suppression de votre part.
        </li>
        <li>
          <strong>Réponses au questionnaire de satisfaction</strong> : 
          conservées pour une durée indéfinie à ce stade, dans le but d'améliorer continuellement le service. 
          Cette durée pourra être ajustée ultérieurement.
        </li>
        <li>
          <strong>Token et données locales (localStorage)</strong> : 
          le token JWT expire après environ 1 heure côté backend. Les données persistent dans votre navigateur 
          jusqu'à déconnexion ou suppression manuelle du stockage local.
        </li>
        <li>
          <strong>Messages et fichiers du chatbot</strong> : 
          non stockés par notre application. Affichés temporairement dans l'interface et perdus au rafraîchissement 
          de la page. Les prestataires externes (Google, VERA) peuvent avoir leurs propres durées de conservation 
          selon leurs politiques respectives.
        </li>
        <li>
          <strong>Logs techniques</strong> : 
          conservés pour une durée limitée (quelques jours à quelques semaines) selon les configurations 
          des prestataires d'infrastructure.
        </li>
        <li>
          <strong>Données d'analytics (Vercel)</strong> : 
          conservées selon la politique de Vercel Analytics (généralement quelques mois).
        </li>
      </ul>
      <p>
        À l'issue de ces durées, vos données sont supprimées ou anonymisées de manière irréversible.
      </p>
    </section>

    <section>
      <h2>9. Vos droits</h2>
      <p>
        Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants 
        concernant vos données personnelles :
      </p>
      <ul>
        <li>
          <strong>Droit d'accès</strong> (article 15 du RGPD) : 
          obtenir la confirmation que des données vous concernant sont traitées et en recevoir une copie.
        </li>
        <li>
          <strong>Droit de rectification</strong> (article 16 du RGPD) : 
          demander la correction de données inexactes ou incomplètes.
        </li>
        <li>
          <strong>Droit à l'effacement</strong> (« droit à l'oubli », article 17 du RGPD) : 
          obtenir la suppression de vos données dans certaines conditions.
        </li>
        <li>
          <strong>Droit à la limitation du traitement</strong> (article 18 du RGPD) : 
          demander le gel temporaire du traitement de vos données dans certains cas.
        </li>
        <li>
          <strong>Droit d'opposition</strong> (article 21 du RGPD) : 
          vous opposer au traitement de vos données pour des raisons tenant à votre situation particulière.
        </li>
        <li>
          <strong>Droit à la portabilité</strong> (article 20 du RGPD) : 
          recevoir vos données dans un format structuré et couramment utilisé, et les transmettre à un autre responsable.
        </li>
        <li>
          <strong>Droit de retirer votre consentement</strong> : 
          lorsque le traitement repose sur votre consentement, vous pouvez le retirer à tout moment.
        </li>
      </ul>

      <h3>9.1. Exercice de vos droits</h3>
      <p>
        Pour exercer l'un de ces droits, vous pouvez nous contacter à l'adresse email suivante : 
        <a href="mailto:[Email de contact]">[Email de contact]</a>
      </p>
      <p>
        Nous vous répondrons dans un délai d'<strong>un mois</strong> à compter de la réception de votre demande. 
        Ce délai peut être prolongé de deux mois supplémentaires en cas de complexité ou de nombre élevé de demandes. 
        Nous vous en informerions alors dans le délai initial d'un mois.
      </p>

      <h3>9.2. Précisions pratiques</h3>
      <p>
        En pratique, l'exercice de ces droits concerne principalement :
      </p>
      <ul>
        <li>
          Les <strong>comptes administrateurs</strong> : vous pouvez demander la suppression de votre compte, 
          l'accès à vos données ou leur rectification.
        </li>
        <li>
          Les <strong>réponses au questionnaire</strong> : si vous avez rempli le questionnaire et souhaitez 
          faire supprimer vos réponses, contactez-nous.
        </li>
      </ul>
      <p>
        Concernant les <strong>messages du chatbot</strong>, ils ne sont pas stockés par notre application et 
        sont perdus au rafraîchissement de la page. Il n'y a donc pas de données à supprimer ou à rectifier dans 
        notre système. Toutefois, si vous avez des préoccupations concernant le traitement de vos messages par 
        les prestataires externes (Google, VERA), nous vous invitons à consulter leurs politiques respectives 
        ou à nous contacter pour plus d'informations.
      </p>
    </section>

    <section>
      <h2>10. Protection des données des mineurs</h2>
      <p>
        L'application ChatWithVera est accessible à tout public, y compris les <strong>mineurs</strong>. 
        Nous portons une attention particulière à la protection des données des personnes mineures.
      </p>

      <h3>10.1. Recommandations aux mineurs</h3>
      <p>
        Si vous avez moins de 18 ans, nous vous recommandons vivement de <strong>ne pas envoyer de fichiers 
        contenant des données personnelles sensibles</strong> via le chatbot, telles que :
      </p>
      <ul>
        <li>Documents d'identité (carte d'identité, passeport, etc.)</li>
        <li>Bulletins scolaires ou documents contenant des informations sur votre scolarité</li>
        <li>Documents médicaux ou informations de santé</li>
        <li>Coordonnées bancaires</li>
        <li>Toute autre information personnelle sensible</li>
      </ul>
      <p>
        En cas de doute, parlez-en à vos parents ou tuteurs légaux avant d'utiliser le service de chatbot 
        avec des pièces jointes.
      </p>

      <h3>10.2. Droits des parents et tuteurs légaux</h3>
      <p>
        Les parents ou tuteurs légaux d'un mineur peuvent exercer les droits RGPD au nom de leur enfant. 
        Si vous êtes parent ou tuteur légal et souhaitez :
      </p>
      <ul>
        <li>Accéder aux données concernant votre enfant</li>
        <li>Demander la rectification ou la suppression de ces données</li>
        <li>Vous opposer au traitement</li>
      </ul>
      <p>
        Vous pouvez nous contacter à l'adresse : <a href="mailto:[Email de contact]">[Email de contact]</a>. 
        Nous pourrons vous demander une preuve de votre autorité parentale ou de tutelle pour traiter votre demande.
      </p>
    </section>

    <section>
      <h2>11. Sécurité des données</h2>
      <p>
        Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données 
        personnelles contre la perte, l'altération, la divulgation ou l'accès non autorisé. Ces mesures incluent notamment :
      </p>
      <ul>
        <li>
          <strong>Hashage des mots de passe</strong> : 
          les mots de passe des comptes administrateurs sont hashés (chiffrés de manière irréversible) 
          à l'aide de l'algorithme bcrypt. Ils ne sont jamais stockés en clair.
        </li>
        <li>
          <strong>Utilisation de protocoles sécurisés</strong> : 
          notre application utilise le protocole HTTPS pour chiffrer les communications entre votre navigateur 
          et nos serveurs.
        </li>
        <li>
          <strong>Authentification par token JWT</strong> : 
          l'accès au tableau de bord administrateur est protégé par un système de token à durée de vie limitée.
        </li>
        <li>
          <strong>Limitation des accès</strong> : 
          seules les personnes autorisées (membres de l'équipe du projet) ont accès aux données stockées 
          en base de données.
        </li>
        <li>
          <strong>Hébergement sécurisé</strong> : 
          nos prestataires d'hébergement (MongoDB Atlas, Vercel, etc.) appliquent des standards de sécurité 
          reconnus dans l'industrie.
        </li>
      </ul>
      <p>
        Malgré ces mesures, aucun système n'est totalement inviolable. Nous vous recommandons de :
      </p>
      <ul>
        <li>Utiliser un mot de passe fort et unique pour votre compte administrateur</li>
        <li>Ne pas partager vos identifiants de connexion</li>
        <li>Vous déconnecter après chaque session, notamment sur un ordinateur partagé</li>
      </ul>
    </section>

    <section>
      <h2>12. Modifications de la politique de confidentialité</h2>
      <p>
        Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment, 
        notamment pour refléter les évolutions de l'application, de la législation ou de nos pratiques en matière 
        de protection des données.
      </p>
      <p>
        Toute modification substantielle vous sera notifiée par un avis visible sur l'application ou, 
        le cas échéant, par email. Nous vous encourageons à consulter régulièrement cette page pour rester 
        informé de nos pratiques.
      </p>
      <p>
        La date de dernière mise à jour figure en haut de cette politique.
      </p>
    </section>

    <section>
      <h2>13. Droit de réclamation auprès de la CNIL</h2>
      <p>
        Si vous estimez que le traitement de vos données personnelles constitue une violation du RGPD ou 
        de la loi Informatique et Libertés, vous avez le droit d'introduire une réclamation auprès de 
        la <strong>Commission Nationale de l'Informatique et des Libertés (CNIL)</strong>, autorité de 
        contrôle française en matière de protection des données personnelles.
      </p>
      <p>Vous pouvez contacter la CNIL :</p>
      <ul>
        <li>
          <strong>Par voie électronique</strong> : via le site internet 
          <a href="https://www.cnil.fr/" target="_blank" rel="noopener noreferrer">https://www.cnil.fr/</a>
        </li>
        <li>
          <strong>Par courrier postal</strong> : 
          <address>
            CNIL<br>
            3 Place de Fontenoy<br>
            TSA 80715<br>
            75334 PARIS CEDEX 07
          </address>
        </li>
      </ul>
    </section>

    <section>
      <h2>14. Contact</h2>
      <p>
        Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, 
        vous pouvez nous contacter :
      </p>
      <address>
        <strong>Par email :</strong> <a href="mailto:[Email de contact]">[Email de contact]</a><br>
        <strong>Par courrier :</strong><br>
        [Nom du responsable]<br>
        [Nom de l'établissement]<br>
        [Adresse postale complète]
      </address>
    </section>
  </article>
</main>
```

---

## 2. === Mentions légales (HTML) ===

```html
<main>
  <article>
    <header>
      <h1>Mentions légales</h1>
    </header>

    <section>
      <h2>1. Éditeur du site</h2>
      <p>Le site web <strong>ChatWithVera</strong> est édité par :</p>
      <address>
        <strong>[Nom du responsable / des responsables]</strong><br>
        [Statut : étudiant(s) à [Nom de l'établissement]]<br>
        [Adresse postale complète]<br>
        Email : <a href="mailto:[Email de contact]">[Email de contact]</a>
      </address>
      <p>
        <strong>Responsable de la publication :</strong> [Nom du responsable]
      </p>
    </section>

    <section>
      <h2>2. Hébergement</h2>
      
      <h3>2.1. Hébergement du frontend</h3>
      <p>Le site web (interface utilisateur) est hébergé par :</p>
      <address>
        <strong>Vercel Inc.</strong><br>
        340 S Lemon Ave #4133<br>
        Walnut, CA 91789<br>
        États-Unis<br>
        Site web : <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer">https://vercel.com/</a>
      </address>

      <h3>2.2. Hébergement du backend</h3>
      <p>L'API backend est hébergée par :</p>
      <address>
        <strong>[Nom de l'hébergeur backend]</strong><br>
        [Adresse de l'hébergeur]<br>
        [Pays]<br>
        Site web : <a href="[URL de l'hébergeur]" target="_blank" rel="noopener noreferrer">[URL de l'hébergeur]</a>
      </address>

      <h3>2.3. Hébergement de la base de données</h3>
      <p>La base de données est hébergée par :</p>
      <address>
        <strong>MongoDB, Inc. (MongoDB Atlas)</strong><br>
        1633 Broadway, 38th Floor<br>
        New York, NY 10019<br>
        États-Unis<br>
        Site web : <a href="https://www.mongodb.com/" target="_blank" rel="noopener noreferrer">https://www.mongodb.com/</a><br>
        Région du cluster : Europe (Paris, eu-west-3)
      </address>
    </section>

    <section>
      <h2>3. Propriété intellectuelle</h2>
      <p>
        L'ensemble du contenu de ce site (textes, images, vidéos, logos, mise en page, code source, etc.) 
        est la propriété exclusive de [Nom du responsable / des responsables] et/ou de [Nom de l'établissement], 
        sauf mentions contraires.
      </p>
      <p>
        Toute reproduction, représentation, modification, publication, transmission, dénaturation, totale ou partielle 
        du site ou de son contenu, par quelque procédé que ce soit, et sur quelque support que ce soit, est interdite 
        sans l'autorisation écrite préalable des responsables du site.
      </p>
      <p>
        Le non-respect de cette interdiction constitue une contrefaçon pouvant engager la responsabilité civile et 
        pénale du contrefacteur.
      </p>
      <p>
        Les marques, logos et signes distinctifs reproduits sur ce site sont la propriété de leurs titulaires respectifs. 
        Toute utilisation non autorisée de ces éléments est susceptible de constituer une violation des droits de 
        propriété intellectuelle.
      </p>
    </section>

    <section>
      <h2>4. Limitation de responsabilité</h2>
      
      <h3>4.1. Contenu du site</h3>
      <p>
        Les informations fournies sur ce site le sont à titre informatif et pédagogique. Nous nous efforçons de 
        maintenir ces informations à jour et exactes, mais ne pouvons garantir leur exhaustivité, leur exactitude 
        ou leur actualité.
      </p>
      <p>
        L'utilisation des informations et contenus disponibles sur le site se fait sous votre propre responsabilité. 
        Les responsables du site ne sauraient être tenus pour responsables de tout dommage direct ou indirect 
        résultant de l'utilisation de ce site ou de l'impossibilité d'y accéder.
      </p>

      <h3>4.2. Service de chatbot et vérification des faits</h3>
      <p>
        Le chatbot ChatWithVera utilise des services externes d'intelligence artificielle (notamment VERA) pour 
        fournir des réponses basées sur la vérification des faits. <strong>Ces réponses sont fournies à titre 
        informatif uniquement</strong> et ne constituent en aucun cas :
      </p>
      <ul>
        <li>Un conseil juridique, médical, financier ou professionnel</li>
        <li>Une vérité absolue ou une garantie d'exactitude</li>
        <li>Un substitut à l'avis d'un professionnel qualifié</li>
      </ul>
      <p>
        Nous vous encourageons à toujours vérifier les informations obtenues auprès de sources fiables et, 
        le cas échéant, à consulter un professionnel compétent.
      </p>

      <h3>4.3. Liens hypertextes</h3>
      <p>
        Ce site peut contenir des liens vers des sites web tiers. Ces liens sont fournis uniquement pour votre 
        commodité. Nous n'avons aucun contrôle sur le contenu de ces sites externes et ne saurions être tenus 
        responsables de leur contenu, de leurs pratiques en matière de confidentialité ou de toute perte ou dommage 
        résultant de leur utilisation.
      </p>

      <h3>4.4. Disponibilité du service</h3>
      <p>
        Nous nous efforçons de maintenir le site accessible en permanence, mais ne pouvons garantir une disponibilité 
        continue sans interruption. Le site peut être temporairement indisponible en raison d'opérations de maintenance, 
        de mises à jour, de pannes techniques ou de circonstances indépendantes de notre volonté.
      </p>
      <p>
        Nous ne saurions être tenus responsables des conséquences d'une interruption ou d'un dysfonctionnement du site, 
        quelle qu'en soit la cause ou la durée.
      </p>
    </section>

    <section>
      <h2>5. Droit applicable et juridiction compétente</h2>
      <p>
        Les présentes mentions légales sont régies par le droit français. En cas de litige relatif à l'utilisation 
        de ce site, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.
      </p>
    </section>

    <section>
      <h2>6. Contact</h2>
      <p>
        Pour toute question concernant ces mentions légales, vous pouvez nous contacter :
      </p>
      <address>
        <strong>Par email :</strong> <a href="mailto:[Email de contact]">[Email de contact]</a><br>
        <strong>Par courrier :</strong><br>
        [Nom du responsable]<br>
        [Nom de l'établissement]<br>
        [Adresse postale complète]
      </address>
    </section>
  </article>
</main>
```

---

## 3. === Conditions Générales d'Utilisation (HTML) ===

```html
<main>
  <article>
    <header>
      <h1>Conditions Générales d'Utilisation</h1>
      <p><strong>Date de dernière mise à jour :</strong> [Date]</p>
    </header>

    <section>
      <h2>1. Objet</h2>
      <p>
        Les présentes Conditions Générales d'Utilisation (ci-après « <strong>CGU</strong> ») ont pour objet de définir 
        les modalités et conditions d'utilisation de l'application web <strong>ChatWithVera</strong> 
        (ci-après « <strong>l'Application</strong> » ou « <strong>le Service</strong> ») ainsi que les droits et 
        obligations des utilisateurs dans ce cadre.
      </p>
      <p>
        ChatWithVera est un projet développé dans un contexte pédagogique par des étudiants de 
        <strong>[Nom de l'établissement]</strong>. L'Application propose un service de chatbot permettant de poser 
        des questions et de recevoir des réponses basées sur la vérification des faits, en s'appuyant notamment sur 
        le service externe <strong>VERA</strong>.
      </p>
      <p>
        En accédant et en utilisant l'Application, vous acceptez sans réserve les présentes CGU. 
        Si vous n'acceptez pas ces conditions, nous vous demandons de ne pas utiliser l'Application.
      </p>
    </section>

    <section>
      <h2>2. Définitions</h2>
      <ul>
        <li>
          <strong>« Utilisateur »</strong> : désigne toute personne physique qui accède et utilise l'Application, 
          qu'elle soit connectée ou non (mode invité).
        </li>
        <li>
          <strong>« Administrateur »</strong> : désigne un membre de l'équipe du projet ChatWithVera disposant 
          d'un compte administrateur permettant d'accéder au tableau de bord sécurisé.
        </li>
        <li>
          <strong>« Chatbot »</strong> : désigne le service conversationnel de l'Application permettant de poser 
          des questions textuelles et de joindre des fichiers pour obtenir une réponse basée sur la vérification des faits.
        </li>
        <li>
          <strong>« Contenu Utilisateur »</strong> : désigne l'ensemble des messages, questions et fichiers 
          envoyés par l'Utilisateur via le Chatbot.
        </li>
      </ul>
    </section>

    <section>
      <h2>3. Accès au service</h2>
      
      <h3>3.1. Conditions d'accès</h3>
      <p>
        L'accès à l'Application est ouvert à toute personne disposant d'une connexion internet et d'un navigateur web 
        compatible. Le Service est accessible gratuitement.
      </p>
      <p>
        L'utilisation du Chatbot ne nécessite pas de création de compte ni d'authentification (mode invité). 
        Toutefois, certaines fonctionnalités avancées (tableau de bord, statistiques) sont réservées aux Administrateurs 
        et nécessitent une authentification.
      </p>

      <h3>3.2. Prérequis techniques</h3>
      <p>
        L'Utilisateur est seul responsable de disposer du matériel et des moyens de télécommunication nécessaires 
        pour accéder à l'Application. Les frais d'accès à internet et les éventuels frais liés à l'utilisation de 
        données mobiles restent à la charge de l'Utilisateur.
      </p>

      <h3>3.3. Mineurs</h3>
      <p>
        L'Application est accessible aux mineurs. Toutefois, nous recommandons aux utilisateurs de moins de 18 ans 
        de solliciter l'accord de leurs parents ou tuteurs légaux avant d'utiliser le Service, notamment avant 
        d'envoyer des fichiers via le Chatbot.
      </p>
    </section>

    <section>
      <h2>4. Utilisation du service</h2>
      
      <h3>4.1. Utilisation du Chatbot</h3>
      <p>
        Le Chatbot permet aux Utilisateurs de :
      </p>
      <ul>
        <li>Poser des questions textuelles</li>
        <li>Joindre des fichiers de différents types (documents, images, audio, vidéo)</li>
        <li>Recevoir des réponses basées sur la vérification des faits via le service VERA</li>
      </ul>
      <p>
        Les messages et fichiers envoyés sont traités par des services externes (Google Gemini pour l'analyse des fichiers, 
        VERA pour la vérification des faits). <strong>L'Application ne stocke pas les messages ni les fichiers en base de données.</strong> 
        Au rafraîchissement de la page, toute la conversation est perdue côté utilisateur.
      </p>

      <h3>4.2. Règles de bonne conduite</h3>
      <p>
        En utilisant l'Application, vous vous engagez à respecter les règles suivantes :
      </p>
      <ul>
        <li>
          <strong>Utilisation conforme à la loi</strong> : 
          vous vous engagez à ne pas utiliser l'Application à des fins illégales, frauduleuses ou interdites.
        </li>
        <li>
          <strong>Respect d'autrui</strong> : 
          vous vous engagez à ne pas diffuser de contenus injurieux, diffamatoires, discriminatoires, violents, 
          pornographiques ou contraires à l'ordre public et aux bonnes mœurs.
        </li>
        <li>
          <strong>Pas de contenu malveillant</strong> : 
          vous vous engagez à ne pas envoyer de fichiers contenant des virus, malwares ou tout autre code malveillant 
          susceptible d'endommager l'Application ou les systèmes tiers.
        </li>
        <li>
          <strong>Propriété intellectuelle</strong> : 
          vous vous engagez à ne pas envoyer de contenus violant les droits de propriété intellectuelle de tiers 
          (droits d'auteur, marques, brevets, etc.).
        </li>
        <li>
          <strong>Données sensibles</strong> : 
          nous vous recommandons vivement de ne pas envoyer de documents contenant des données personnelles sensibles 
          (documents d'identité, informations médicales, coordonnées bancaires, etc.), en particulier si vous êtes mineur.
        </li>
      </ul>

      <h3>4.3. Sanctions en cas de non-respect</h3>
      <p>
        En cas de non-respect des présentes CGU, nous nous réservons le droit de :
      </p>
      <ul>
        <li>Suspendre ou bloquer temporairement l'accès à l'Application</li>
        <li>Supprimer tout Contenu Utilisateur qui contreviendrait aux règles énoncées</li>
        <li>Signaler aux autorités compétentes tout comportement illégal ou frauduleux</li>
      </ul>
    </section>

    <section>
      <h2>5. Nature et limites du service de vérification des faits</h2>
      
      <h3>5.1. Service informatif uniquement</h3>
      <p>
        Les réponses fournies par le Chatbot via le service VERA sont basées sur des algorithmes d'intelligence 
        artificielle et sur des bases de données de vérification des faits. <strong>Ces réponses sont fournies 
        à titre purement informatif</strong> et ne constituent en aucun cas :
      </p>
      <ul>
        <li>Un conseil professionnel (juridique, médical, financier, etc.)</li>
        <li>Une garantie d'exactitude ou de véracité absolue</li>
        <li>Un substitut au jugement critique ou à l'analyse personnelle</li>
      </ul>

      <h3>5.2. Limitation de responsabilité</h3>
      <p>
        Nous ne pouvons garantir l'exactitude, la complétude ou l'actualité des informations fournies par le Chatbot. 
        Les réponses peuvent contenir des erreurs, des inexactitudes ou être obsolètes.
      </p>
      <p>
        L'Utilisateur reconnaît être informé de ces limites et s'engage à :
      </p>
      <ul>
        <li>Vérifier les informations obtenues auprès de sources fiables</li>
        <li>Exercer son esprit critique face aux réponses fournies</li>
        <li>Consulter un professionnel qualifié en cas de besoin</li>
      </ul>
      <p>
        Nous déclinons toute responsabilité en cas de préjudice direct ou indirect résultant de l'utilisation 
        des informations fournies par le Chatbot.
      </p>

      <h3>5.3. Services tiers</h3>
      <p>
        Le Chatbot s'appuie sur des services externes (Google Gemini, VERA) dont nous ne contrôlons ni le fonctionnement 
        ni les politiques. Nous ne saurions être tenus responsables des dysfonctionnements, erreurs ou interruptions 
        de ces services tiers.
      </p>
    </section>

    <section>
      <h2>6. Propriété intellectuelle</h2>
      
      <h3>6.1. Propriété de l'Application</h3>
      <p>
        L'ensemble des éléments composant l'Application (structure, design, code source, textes, images, logos, etc.) 
        est la propriété exclusive de [Nom du responsable / des responsables] et/ou de [Nom de l'établissement], 
        sauf mentions contraires.
      </p>
      <p>
        Toute reproduction, représentation, modification ou exploitation de tout ou partie de l'Application sans 
        autorisation préalable est strictement interdite et constitue une contrefaçon sanctionnée par le Code de 
        la propriété intellectuelle.
      </p>

      <h3>6.2. Contenu Utilisateur</h3>
      <p>
        En envoyant du Contenu Utilisateur via le Chatbot, vous conservez l'entière propriété de ce contenu. 
        Toutefois, vous accordez aux responsables de l'Application et aux prestataires techniques (Google, VERA) 
        une licence non exclusive pour traiter, analyser et utiliser ce contenu dans le but de fournir le Service.
      </p>
      <p>
        Vous garantissez être titulaire de tous les droits nécessaires sur le Contenu Utilisateur que vous envoyez 
        et que ce contenu ne viole aucun droit de tiers.
      </p>
    </section>

    <section>
      <h2>7. Données personnelles</h2>
      <p>
        Le traitement de vos données personnelles est régi par notre 
        <a href="/politique-de-confidentialite">Politique de confidentialité</a>, 
        qui fait partie intégrante des présentes CGU.
      </p>
      <p>
        Nous vous invitons à consulter cette politique pour comprendre quelles données sont collectées, 
        comment elles sont utilisées, et quels sont vos droits en la matière.
      </p>
    </section>

    <section>
      <h2>8. Disponibilité et maintenance</h2>
      <p>
        Nous nous efforçons de maintenir l'Application accessible en permanence, mais ne pouvons garantir une 
        disponibilité continue et sans interruption.
      </p>
      <p>
        L'Application peut être temporairement indisponible en raison :
      </p>
      <ul>
        <li>D'opérations de maintenance programmée ou d'urgence</li>
        <li>De pannes techniques ou de dysfonctionnements</li>
        <li>De circonstances indépendantes de notre volonté (problèmes réseau, attaques informatiques, etc.)</li>
      </ul>
      <p>
        Nous ne saurions être tenus responsables des conséquences d'une interruption ou d'un dysfonctionnement 
        du Service, quelle qu'en soit la cause ou la durée.
      </p>
    </section>

    <section>
      <h2>9. Modification et fin du service</h2>
      
      <h3>9.1. Modification de l'Application</h3>
      <p>
        Nous nous réservons le droit de modifier, améliorer ou supprimer certaines fonctionnalités de l'Application 
        à tout moment, sans préavis ni justification.
      </p>

      <h3>9.2. Modification des CGU</h3>
      <p>
        Les présentes CGU peuvent être modifiées à tout moment. Les modifications seront portées à votre connaissance 
        par un avis visible sur l'Application. Votre utilisation continue de l'Application après publication des 
        modifications vaut acceptation des nouvelles CGU.
      </p>
      <p>
        La date de dernière mise à jour figure en haut de ce document.
      </p>

      <h3>9.3. Fin du service</h3>
      <p>
        ChatWithVera étant un projet scolaire développé dans un cadre pédagogique, le Service pourra être interrompu 
        de manière temporaire ou définitive, notamment à l'issue du projet scolaire.
      </p>
      <p>
        Nous nous efforcerons, dans la mesure du possible, de vous informer de toute interruption définitive du Service 
        avec un préavis raisonnable.
      </p>
    </section>

    <section>
      <h2>10. Responsabilité</h2>
      
      <h3>10.1. Limitation de responsabilité</h3>
      <p>
        L'Application est fournie « en l'état » et « selon disponibilité », sans garantie d'aucune sorte, 
        expresse ou implicite.
      </p>
      <p>
        Nous ne saurions être tenus responsables de tout dommage direct ou indirect résultant de :
      </p>
      <ul>
        <li>L'utilisation ou l'impossibilité d'utiliser l'Application</li>
        <li>L'inexactitude ou l'incomplétude des informations fournies par le Chatbot</li>
        <li>La perte de données</li>
        <li>Des actes de tiers (piratage, virus, etc.)</li>
        <li>Des dysfonctionnements des services tiers (Google, VERA, hébergeurs, etc.)</li>
      </ul>

      <h3>10.2. Responsabilité de l'Utilisateur</h3>
      <p>
        L'Utilisateur est seul responsable de :
      </p>
      <ul>
        <li>L'utilisation qu'il fait de l'Application</li>
        <li>Du Contenu Utilisateur qu'il envoie via le Chatbot</li>
        <li>Des conséquences de ses actions sur l'Application</li>
      </ul>
      <p>
        L'Utilisateur s'engage à indemniser les responsables de l'Application de tout préjudice résultant d'une 
        utilisation non conforme aux présentes CGU ou d'une violation de la loi.
      </p>
    </section>

    <section>
      <h2>11. Droit applicable et règlement des litiges</h2>
      
      <h3>11.1. Droit applicable</h3>
      <p>
        Les présentes CGU sont régies par le droit français.
      </p>

      <h3>11.2. Règlement amiable</h3>
      <p>
        En cas de litige relatif à l'interprétation ou à l'exécution des présentes CGU, nous vous invitons 
        à nous contacter en priorité à l'adresse <a href="mailto:[Email de contact]">[Email de contact]</a> 
        afin de tenter de trouver une solution amiable.
      </p>

      <h3>11.3. Juridiction compétente</h3>
      <p>
        À défaut de résolution amiable, tout litige sera porté devant les tribunaux français compétents.
      </p>
    </section>

    <section>
      <h2>12. Contact</h2>
      <p>
        Pour toute question concernant les présentes Conditions Générales d'Utilisation, vous pouvez nous contacter :
      </p>
      <address>
        <strong>Par email :</strong> <a href="mailto:[Email de contact]">[Email de contact]</a><br>
        <strong>Par courrier :</strong><br>
        [Nom du responsable]<br>
        [Nom de l'établissement]<br>
        [Adresse postale complète]
      </address>
    </section>
  </article>
</main>
```

---

## 4. === Avertissement Chatbot (HTML) ===

```html
<section aria-labelledby="chatbot-warning-title" class="chatbot-warning">
  <h2 id="chatbot-warning-title">⚠️ Informations importantes avant d'utiliser le chatbot</h2>
  
  <div class="warning-content">
    <p>
      Avant d'envoyer des messages et des fichiers au chatbot, veuillez lire attentivement les informations suivantes :
    </p>
    
    <h3>Transmission à des services externes</h3>
    <p>
      Les messages que vous écrivez et les fichiers que vous joignez sont transmis à des <strong>services externes</strong> 
      pour être analysés et traités :
    </p>
    <ul>
      <li>
        <strong>Google Gemini</strong> : analyse le contenu de vos fichiers (documents, images, audio, vidéo) 
        pour en extraire des informations.
      </li>
      <li>
        <strong>VERA</strong> : service d'intelligence artificielle qui vérifie les faits et fournit une réponse 
        basée sur votre question et le contenu de vos fichiers.
      </li>
    </ul>

    <h3>Notre application ne conserve pas vos données</h3>
    <p>
      <strong>ChatWithVera ne stocke pas vos messages ni vos fichiers</strong> dans sa base de données. 
      Vos conversations sont affichées temporairement dans votre navigateur et disparaissent lorsque vous 
      rafraîchissez la page.
    </p>
    <p>
      Toutefois, les services externes (Google et VERA) peuvent traiter et potentiellement conserver vos données 
      selon leurs propres politiques de confidentialité. Le service VERA peut notamment conserver certaines questions 
      de manière anonymisée pour améliorer ses modèles de vérification des faits.
    </p>

    <h3>Recommandations importantes</h3>
    <p>
      Pour protéger votre vie privée, nous vous recommandons vivement de <strong>ne pas envoyer de fichiers 
      contenant des informations sensibles ou personnelles</strong>, telles que :
    </p>
    <ul>
      <li>Documents d'identité (carte d'identité, passeport, permis de conduire, etc.)</li>
      <li>Documents médicaux ou informations de santé</li>
      <li>Coordonnées bancaires ou financières</li>
      <li>Bulletins scolaires ou documents scolaires personnels</li>
      <li>Contrats ou documents confidentiels</li>
      <li>Photos ou vidéos privées contenant des informations personnelles identifiables</li>
    </ul>

    <h3>Si vous avez moins de 18 ans</h3>
    <p>
      Si vous êtes mineur, parlez-en à vos parents ou à un adulte de confiance avant d'utiliser ce service, 
      surtout si vous souhaitez envoyer des fichiers. Vos parents peuvent vous conseiller et vous aider à 
      protéger vos informations personnelles.
    </p>

    <h3>En savoir plus</h3>
    <p>
      Pour plus d'informations sur la façon dont vos données sont traitées, consultez notre 
      <a href="/politique-de-confidentialite">Politique de confidentialité</a> et nos 
      <a href="/conditions-generales-utilisation">Conditions Générales d'Utilisation</a>.
    </p>
  </div>

  <div class="warning-action">
    <button type="button" id="accept-chatbot-warning" aria-describedby="chatbot-warning-title">
      J'ai compris et j'accepte ces conditions
    </button>
  </div>
</section>
```

---

## 5. === Footer (HTML) ===

```html
<footer role="contentinfo">
  <div class="footer-content">
    <p class="footer-copyright">
      © <span id="current-year">[Année]</span> ChatWithVera. Tous droits réservés.
    </p>
    
    <nav aria-label="Liens légaux et informatifs">
      <ul>
        <li>
          <a href="/politique-de-confidentialite">Politique de confidentialité</a>
        </li>
        <li>
          <a href="/mentions-legales">Mentions légales</a>
        </li>
        <li>
          <a href="/conditions-generales-utilisation">Conditions Générales d'Utilisation</a>
        </li>
      </ul>
    </nav>

    <p class="footer-note">
      ChatWithVera est un projet pédagogique développé par des étudiants de [Nom de l'établissement].
    </p>
  </div>
</footer>
```

---

## 6. === Paragraphe de synthèse pour rapport / soutenance ===

**Gestion des données personnelles et conformité RGPD dans ChatWithVera**

ChatWithVera est une application web développée dans un cadre pédagogique qui respecte les principes fondamentaux du Règlement Général sur la Protection des Données (RGPD). L'application traite principalement trois catégories de données : les comptes administrateurs (email, nom d'utilisateur, mot de passe hashé) stockés dans une base MongoDB Atlas hébergée en Europe (région Paris), les réponses anonymisées issues d'un questionnaire de satisfaction sur le service VERA, et des données techniques de navigation collectées via Vercel Analytics pour améliorer l'expérience utilisateur. Il est crucial de noter que les messages et fichiers envoyés via le chatbot ne sont pas conservés par notre application : ils sont affichés temporairement dans l'interface utilisateur et disparaissent au rafraîchissement de la page. Ces données transitent uniquement par notre infrastructure backend (NestJS) vers un workflow n8n hébergé sur un serveur privé, puis sont analysées par l'API Google Gemini avant d'être transmises au service externe VERA pour la vérification des faits.

Nous avons mis en place plusieurs garanties pour assurer la protection des données et le respect du RGPD : minimisation de la collecte (nous ne stockons que les données strictement nécessaires), sécurisation renforcée (hashage des mots de passe avec bcrypt, utilisation du protocole HTTPS, authentification par token JWT), information transparente des utilisateurs via une politique de confidentialité détaillée et des avertissements explicites avant l'envoi de fichiers au chatbot, et respect des droits des personnes (droit d'accès, de rectification, d'effacement, notamment pour les comptes administrateurs). Une attention particulière a été portée à la protection des mineurs avec une section dédiée dans notre politique de confidentialité, des recommandations claires pour ne pas envoyer de documents contenant des données sensibles, et la possibilité pour les parents d'exercer les droits RGPD au nom de leurs enfants. Enfin, nous avons identifié et documenté tous les transferts de données vers des prestataires tiers (Google, VERA, Vercel, MongoDB Atlas), certains pouvant impliquer des traitements hors Union européenne avec les garanties appropriées comme les clauses contractuelles types, assurant ainsi une conformité complète avec la réglementation française et européenne en matière de protection des données personnelles.

---

**Note finale** : Tous ces contenus utilisent des placeholders entre crochets `[...]` que vous devrez remplacer par vos informations réelles. Pensez également à mettre à jour la date de dernière mise à jour dans chaque document lors de sa publication ou de toute modification.
