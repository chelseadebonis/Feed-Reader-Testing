/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /*  TEST 1 --
         * allFeeds variable has been defined and that it is not
         * empty
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toEqual(0);
        });


        /* allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URl is defined', function() {
           allFeeds.forEach(function(feed) {
           expect(feed.url).toBeDefined();
           expect(feed.url.length).not.toEqual(0);
         });
         });

        /*  TEST 2 --
         * loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty
         */
         it('Name is defined', function() {
           for(let feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toEqual(0);
           }
         });

    });


    /*  TEST 3 -- */
describe('The Menu', function() {

        // ensures the menu element is hidden by default

         it('hides by default', function() {
           const body = document.querySelector('body');
           expect(body.classList.contains('menu-hidden')).toBe(true);
         });
         /* ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('changes visibility when clicked', function() {
            //menu display when clicked
            const body = document.querySelector('body');
            const menu = document.querySelector('.menu-icon-link');

            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);

            //menu hides when clicked again
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
          });

});
    /*  TEST 4 -- */
describe('Initial Entries', function() {

        /* ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         beforeEach(function(done) {
           loadFeed(0, done);
         });

         it('completes and contains at least a single entry', function() {

           expect($('.feed .entry')).toBeDefined();
           expect($('.feed .entry').length).not.toEqual(0);

         });

});
    /*  TEST 5 -- */
describe('New Feed Selection', function() {
        /* ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
          let oldFeed;
          let newFeed;


         beforeEach(function(done) {
           //first feed
               loadFeed(0, function() {
                 oldFeed = $('.feed').html();
            // now first call is made you can make second call  
               loadFeed(1, function() {
                 newFeed = $('.feed').html();
                 done();
               });
               });
             });

         it('content changes', function() {
             expect(oldFeed).not.toBe(newFeed);
            });
         });

}());
