{
   const templates = {
      articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
      tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
      authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
      tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
      authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
   }
   const opt = {
      ArticleTagsSelector: '.post-tags .list',
      TagsListSelector: '.tags.list',
      AuthorsListSelector: '.authors.list',
      CloudClassCount: '5',
      CloudClassPrefix: 'tag-size-',
      articleSelector: '.post',
      TitleSelector: '.post-title',
      TitleListSelector: '.titles',
      ArticleAuthorSelector: '.post-author'
   }
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



   function generateTitleLinks(customSelector = '') {
      console.log(customSelector);
      /* remove contents of titleList */

      const titleList = document.querySelector(opt.TitleListSelector);
      function clearMessages() {
         document.querySelector(opt.TitleListSelector).innerHTML = "";
      }
      clearMessages();

      /* for each article */

      const articles = document.querySelectorAll(opt.articleSelector + customSelector);

      let html = '';
      for (let article of articles) {

         /* get the article id */

         const articleId = article.getAttribute("id");

         /* find the title element, get the title from the title element*/

         const articleTitle = article.querySelector(opt.TitleSelector).innerHTML;

         /* create HTML of the link */

         //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
         const linkHTMLData = { id: articleId, title: articleTitle };
         const linkHTML = templates.articleLink(linkHTMLData);
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



   function calculateTagsParams(tags) {
      const params = {
         max: 0,
         min: 999999
      };
      for (let tag in tags) {
         //console.log(tag + ' is used ' + tags[tag] + ' times');
         if (tags[tag] > params.max) {
            params.max = tags[tag];
         } else if (tags[tag] < params.min) {
            params.min = tags[tag];
         }

      }
      return params;
   }
   function calculateTagClass(count, params) {
      const normalizedCount = count - params.min;
      const normalizedMax = params.max - params.min;
      const percentage = normalizedCount / normalizedMax;
      const classNumber = Math.floor(percentage * (opt.CloudClassCount - 1) + 1);
      return opt.CloudClassPrefix + classNumber;
   }
   function generateTags() {
      /* [NEW] create a new variable allTags with an empty object */
      let allTags = {};
      console.log(allTags);

      /* find all articles */

      const articles = document.querySelectorAll(opt.articleSelector);

      /* START LOOP: for every article: */

      for (let article of articles) {

         /* find tags wrapper */

         const titleList = article.querySelector(opt.ArticleTagsSelector);

         /* make html variable with empty string */

         let html = '';

         /* get tags from data-tags attribute */

         const articleTags = article.getAttribute("data-tags");

         /* split tags into array */

         const articleTagsArray = articleTags.split(' ');

         /* START LOOP: for each tag */

         for (let tag of articleTagsArray) {

            /* generate HTML of the link */
            //const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
            const linkHTMLData = { id: tag, title: tag };
            const linkHTML = templates.tagLink(linkHTMLData);
            /* add generated code to html variable */
            html = html + linkHTML;
            /* [NEW] check if this link is NOT already in allTags */
            if (!allTags[tag]) {
               /* [NEW] add tag to allTags object */
               allTags[tag] = 1;
            } else {
               allTags[tag]++;
            }

         }

         /* END LOOP: for each tag */

         /* insert HTML of all the links into the tags wrapper */

         titleList.innerHTML = html;

         /* END LOOP: for every article: */

      }

      /* [NEW] find list of tags in right column */
      const tagList = document.querySelector(opt.TagsListSelector);

      /* [NEW] create variable for all links HTML code */
      const tagsParams = calculateTagsParams(allTags);
      console.log('tagsParams:', tagsParams);
      const allTagsData = {tags: []};


      /* [NEW] START LOOP: for each tag in allTags: */
      for (let tag in allTags) {
         console.log(tag);
         console.log(allTags);
         /* [NEW] generate code of a link and add it to allTagsHTML */
         //const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';
         const tagLinkHTMLData = { id: calculateTagClass(allTags[tag], tagsParams),title:tag }
         const tagLinkHTML = templates.tagCloudLink(tagLinkHTMLData);
         console.log(allTags[tag]);

         allTagsData.tags.push({
            tag: tag,
            count: allTags[tag],
            className: calculateTagClass(allTags[tag], tagsParams)
          });
         //console.log(allTagsHTML);
         console.log(tagLinkHTML);
      }
      /* [NEW] END LOOP: for each tag in allTags: */

      /*[NEW] add HTML from allTagsHTML to tagList */
      tagList.innerHTML = templates.tagCloudLink(allTagsData);

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



   function generateAuthors() {

      let allAuthors = {};
      console.log(allAuthors);
      const articles = document.querySelectorAll(opt.articleSelector);
      for (let article of articles) {

         const authorWrapper = article.querySelector(opt.ArticleAuthorSelector);
         let html = '';
         const articleAuthor = article.getAttribute("data-author");
         if (!allAuthors[articleAuthor]) {
            allAuthors[articleAuthor] = 1;
         } else {
            allAuthors[articleAuthor]++;
         }

         authorWrapper.innerHTML = html;
         //authorWrapper.innerHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
         
         const authorHTMLData = { id: articleAuthor, title: articleAuthor };
         const authorHTML = templates.authorLink(authorHTMLData);
         authorWrapper.innerHTML = authorHTML;
      }

      const authorList = document.querySelector(opt.AuthorsListSelector);
      console.log(authorList);
      const authorsParams = calculateTagsParams(allAuthors);
      console.log('authorsParams:', authorsParams);
      const allAuthorsData = {authors: []};
      for (let author in allAuthors) {
         console.log(author);
         console.log(allAuthors);
         //const authorLinkHTML = '<li><a class="' + calculateTagClass(allAuthors[author], authorsParams) + '" href="#author-' + author + '">' + author + '</a></li>';
         console.log(allAuthors[author]);

         allAuthorsData.authors.push({
            author: author,
            count: allAuthors[author],
            className: calculateTagClass(allAuthors[author], authorsParams)
          });

         console.log(allAuthorsData);
      }

      //authorList.innerHTML = allAuthorsHTML;
      authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
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