// src/app.controller.ts
import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  public root() {
    // --- DÉBUT DE LA MODIFICATION ---
    // On crée un objet contenant tous nos textes
    const locale = {
      login_screen_title: "Connexion",
      remaining_questions: "Questions restantes:",
      menu: "Menu",
      upgrade_to_unlimited: "Passer à l'illimité",
      or: "OU",
      watch_ad: "Regarder une publicité",
      premium_user: "Utilisateur Premium",
      saved_quizzes: "Quiz sauvegardés",
      language_selection: "Langue",
      volume_on: "Son activé",
      volume_off: "Son désactivé",
      report_problem: "Signaler un problème",
      suggest_idea: "Suggérer une idée",
      rate_the_app: "Évaluer l'application",
      logout: "Déconnexion",
      category_mcq: "QCM",
      category_true_false: "Vrai/Faux",
      category_summary: "Résumé",
      category_flashcards: "Flashcards",
      category_fill_in_blank: "Texte à trous",
      category_vocabulary: "Vocabulaire",
      category_youtube_to_quiz: "YouTube → Quiz",
      category_podcast: "Podcast",
      category_chronology: "Chronologie",
      category_identification: "Identification",
      choose_number_questions: "Choisissez le nombre de questions",
      choose_summary_length: "Choisissez la longueur du résumé",
      length_short: "Court",
      length_medium: "Moyen",
      length_long: "Long",
      back: "Retour",
      choose_file_type: "Choisissez une source",
      file_text: "Texte",
      file_image: "Image",
      file_pdf: "PDF",
      paste_youtube_link: "Collez un lien YouTube",
      ok: "OK",
    };

    // On retourne un objet. La clé 't' sera accessible dans le fichier .hbs
    return { t: locale };
    // --- FIN DE LA MODIFICATION ---
  }

  // On peut laisser cette route pour les tests
  @Get('hello')
  public getHello() {
    return 'Hello World!';
  }
}