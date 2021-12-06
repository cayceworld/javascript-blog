{
   const titleClickHandler = function (event) {
      event.preventDefault();
      const clickedElement = this;
      console.log('Link was clicked!');

      /* [DONE] remove class 'active' from all article links  */

      const activeLinks = document.querySelectorAll('.titles a.active');

      for (let activeLink of activeLinks) {
         activeLink.classList.remove('active');
      }

      /* [DONE] add class 'active' to the clicked link */

      //console.log('clickedElement:', clickedElement);

      clickedElement.classList.add('active');

      /* [DONE] remove class 'active' from all articles */

      const activeArticles = document.querySelectorAll('.posts article.active');

      for (let activeArticle of activeArticles) {
         activeArticle.classList.remove('active');
      }
      /* get 'href' attribute from the clicked link */

      const articleSelector = clickedElement.getAttribute("href");
      console.log(articleSelector);

      /* find the correct article using the selector (value of 'href' attribute) */

      const targerArticle = document.querySelector(articleSelector);
      console.log(targerArticle);

      /* add class 'active' to the correct article */

      targerArticle.classList.add('active');
   }

   const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles';

   function generateTitleLinks(customSelector = '') {
      console.log(customSelector);
      /* remove contents of titleList */

      const titleList = document.querySelector(optTitleListSelector);
      function clearMessages() {
         document.querySelector(optTitleListSelector).innerHTML = "";
      }
      clearMessages();

      /* for each article */

      //const articles = optArticleSelector; ???

      const articles = document.querySelectorAll(optArticleSelector + customSelector);
     
      let html = '';
      for (let article of articles) {

         /* get the article id */

         const articleId = article.getAttribute("id");

         /* find the title element, get the title from the title element*/

         const articleTitle = article.querySelector(optTitleSelector).innerHTML;

         /* create HTML of the link */

         const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

         /* insert link into titleList */

         html = html + linkHTML;

      }

      titleList.innerHTML = html;
      const links = document.querySelectorAll('.titles a');

      for (let link of links) {
         link.addEventListener('click', titleClickHandler);
      }
   }

   generateTitleLinks();

   const optArticleTagsSelector = '.post-tags .list';
   function generateTags() {

      /* find all articles */

      const articles = document.querySelectorAll('.post');

      /* START LOOP: for every article: */

      for (let article of articles) {
        
         /* find tags wrapper */

         const titleList = article.querySelector(optArticleTagsSelector);

         /* make html variable with empty string */

         let html = '';

         /* get tags from data-tags attribute */

         const articleTags = article.getAttribute("data-tags");

         /* split tags into array */

         const articleTagsArray = articleTags.split(' ');

         /* START LOOP: for each tag */

         for (let tag of articleTagsArray) {

            /* generate HTML of the link */
            const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

            /* add generated code to html variable */
            html = html + linkHTML;
         }

         /* END LOOP: for each tag */

         /* insert HTML of all the links into the tags wrapper */

         titleList.innerHTML = html;

         /* END LOOP: for every article: */

      }
   }
   generateTags();


   function tagClickHandler(event) {

      /* prevent default action for this event */
      event.preventDefault();
      console.log('Link was clicked!');

      /* make new constant named "clickedElement" and give it the value of "this" */

      const clickedElement = this;
      console.log(this);

      /* make a new constant "href" and read the attribute "href" of the clicked element */

      const href = clickedElement.getAttribute('href');
      

      /* make a new constant "tag" and extract tag from the "href" constant */

      const tag = href.replace('#tag-', '');
      

      /* find all tag links with class active */

      const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
      

      /* START LOOP: for each active tag link */
      for (let activeTag of activeTags) {
         /* remove class active */
         activeTag.classList.remove('active');

         /* END LOOP: for each active tag link */
      }
      /* find all tag links with "href" attribute equal to the "href" constant */

      const tagsHref = document.querySelectorAll('a[href="' + href + '"]');

      /* START LOOP: for each found tag link */
      for (let tagHref of tagsHref) {
         /* add class active */
         tagHref.classList.add('active');
         /* END LOOP: for each found tag link */
      }
      /* execute function "generateTitleLinks" with article selector as argument */
      generateTitleLinks('[data-tags~="' + tag + '"]');

   }

   function addClickListenersToTags() {
      /* find all links to tags */
      linksTags = document.querySelectorAll('a[href^="#tag-"]');
      
      /* START LOOP: for each link */
      for (let linkTag of linksTags) {
         /* add tagClickHandler as event listener for that link */
         linkTag.addEventListener('click', tagClickHandler);
         /* END LOOP: for each link */
      }
   }

   addClickListenersToTags();

   const optArticleAuthorSelector = '.post-author'

   function generateAuthors() {
      const articles = document.querySelectorAll('.post');
      for (let article of articles) {
        
         const authorWrapper = article.querySelector(optArticleAuthorSelector);
         let html = '';
         const articleAuthor = article.getAttribute("data-author");

         
         authorWrapper.innerHTML = html;
        
         authorWrapper.innerHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
      }
   }

   generateAuthors();

   function authorClickHandler(event) {
      event.preventDefault();
      console.log('Link was clicked!');

      const clickedElement = this;
      console.log(this);
      const href = clickedElement.getAttribute('href');
      
      const author = href.replace('#author-', '');
      
      const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
      

      for (let activeAuthor of activeAuthors) {
         activeAuthor.classList.remove('active');
         
      }

      const clickedAuthors = document.querySelectorAll('a[href="' + href + '"]');
      

      for (let clickedAuthor of clickedAuthors) {
         clickedAuthor.classList.add('active');
         console.log(clickedAuthor);
      }
      generateTitleLinks('[data-author="' + author + '"]');
    
   }

   function addClickListenersToAuthors() {
      linksAuthors = document.querySelectorAll('a[href^="#author-"]');
      
      for (let linkAuthor of linksAuthors) {
         linkAuthor.addEventListener('click', authorClickHandler);
      }
   }
   addClickListenersToAuthors();

}