# Exam1 Starter for CPSC213

If you are reading this, it is likely because you accepted the
GitHub invitation to this exam starter code. When you accept
that invitation, it creates a repo on GitHub that has the
permissions set up such that it is easy for me to grade your
exam.

## Submitting your exam solution

Your exam solution will be a small JavaScript (node)
server that responds to HTTP requests. All the code to run
that server should be in this repo. When I grade your exam,
I will run your code using the following series of commands.
Imagine your repo is at `http://github.com/yale-cpsc-213/exam1-submission-foo`:

```
git clone http://github.com/yale-cpsc-213/exam1-submission-foo
cd exam1-submission-foo
export DATABASE_URL=...
export PORT=...
npm start
```

Clearly, I will be grading the `master` branch of your code
on GitHub.

You can push up your exam solution as many times as you
like prior to the end of the exam. Indeed, you should do
so.

## Grading your exam

You can find the grading code for your platform here:

* Windows https://kljensen.s3.amazonaws.com/public/exam1/windows/exam1.exe
* Mac https://kljensen.s3.amazonaws.com/public/exam1/mac/exam1
* Linux https://kljensen.s3.amazonaws.com/public/exam1/linux/exam1

Once you download the `exam1` program, you should make it executable,
then you can run it as such:

```
DATABASE_URL=postgres://gracehopper:buyer-lumen-local-centaur@exam1db.cpsc213.io/exam1 ./exam1 grade $YOUR_CLASS_NICKNAME $YOUR_SERVER_URL
```

For example, if your class nickname is "fluffy-bunny" and your code is running
at `http://localhost:8000` you'd run the following:

```
DATABASE_URL=postgres://gracehopper:buyer-lumen-local-centaur@exam1db.cpsc213.io/exam1 ./exam1 grade fluffy-bunny http://localhost:8000
```

If you add the `-v` flag to the program, it will print detailed requirements
for each of the questions. For example, when I run

```
DATABASE_URL=postgres://gracehopper:buyer-lumen-local-centaur@exam1db.cpsc213.io/exam1 ./exam1 grade fluffy-bunny http://localhost:8000 -v
```

The output looks like the following:

```
--------------------------------
✅ PASS - responds to GET "/" with HTTP status 200 (10/10 pts)

	You should have an HTTP server running. This testing code
	will request the root page ("/") and your HTTP server should
	respond with HTTP code 200. The content can be anything you
	wish.

--------------------------------
✅ PASS - computes SHA-1 hashes of GET requests to /hash with parameter x (10/10 pts)

	When your server receives a GET request to the /hash URL, it should
	return the SHA-1 hash of the GET request's x query parameter appended to
	your class nickname. E.g. if the content of the parameter is "foo" and
	your class nickname is "fuzzy-bunny", the you would compute the hex
	digest of the sha1 hash of "foofuzzy-bunny", which is
	"2d3c8dacb50d0cfc1808520295f72b049f535d43".

	✅ PASS - responds with status 200 at http://localhost:8000/hash?x=xvl
	✅ PASS - correctly hashes input x=xvl
--------------------------------
✅ PASS - has an API at /rsvp that accepts GET and POST requests (15/15 pts)

	Your server should responsd to POST requests at /rsvp, expecting a
	parameter "person" with a value equal to the name of the person RSVPing.
  (Technically, the form is POSTed with content-type "application/x-www-form-urlencoded")
	When you receive at GET request to /rsvp, you should return a list of
	all the people that have RSVP'd. The list can be in any format as long
	as the names of all the RSVP'd people are present.

	✅ PASS - accepts POST requests to RSVP users
	✅ PASS - accepts GET requests and list the RSVP'd users
--------------------------------
✅ PASS - does math at "/math/{operation}, using query parameters x & y" (20/20 pts)

	Your HTTP server should be listening for requests at "/math/{operation}",
	where {operation} is add, subtract, multiply, or divide. The server can
	expect to receive two query parameters x and y and it should return the
	result of "x operation y", e.g. if the request is to "/math/add?x=5&y=6"
	the response should be 11 with status code 200. If either x or y is not
	a valid number, it should return status code 400.

	✅ PASS - should be able to do add at /math/add
	✅ PASS - should be able to do subtract at /math/subtract
	✅ PASS - should be able to do multiply at /math/multiply
	✅ PASS - should be able to do divide at /math/divide
--------------------------------
✅ PASS - has "detail" pages populated from movie database (30/30 pts)

	Your app should show movies at "/movies/{id}" where {id} is the
	id of a movie in the movie database given to you by the instructor.
	(You should have a DATABASE_URL environment variable with credentials
	for connecting to the database.) For example "/movies/2" should show
	information for Titanic and "/movies/50" should show information for
	"Speed 2: Cruise Control". The information required is as follows.
	Each page should have 1) an <h1> HTML element containing the movie's
	title; 2) a <span> HTML element with CSS class "rating" containing
	the MPAA rating of the movie; 3) an <li> element for each review
	of the the movie (all in a <ul> element); 4) a <span> in each of those
	<li> elements with CSS class "name" containing the first name of
	the reviewer and a <span> with CSS class "score" containing that
	user's score.

	✅ PASS - responds with status 200 at the URL /movies/{id}
	✅ PASS - has an <h1> HTML element containing the movie's title
	✅ PASS - has a <span> HTML element with CSS class "rating" containing rating
	✅ PASS - has an <li> element for each review
	✅ PASS - has <span class="name"> and <span class="score"> in each of those
--------------------------------
```

You can read the grading code here [https://github.com/yale-cpsc-213/exam1](https://github.com/yale-cpsc-213/exam1) if you
want to see how each test is performed. E.g. here is the math test:
[https://github.com/yale-cpsc-213/exam1/blob/master/questions/canDoMaths.go](https://github.com/yale-cpsc-213/exam1/blob/master/questions/canDoMaths.go).

## My solution

My solution is running at [http://exam1solution.cpsc213.io](http://exam1solution.cpsc213.io).
You are free to look at that running application and the returned HTML source in order to
see how your app should behave.

## Asking questions

You can ask questions at [https://cpsc113.som.yale.edu/lectures/exam-1](https://cpsc113.som.yale.edu/lectures/exam-1) and I will answer so that the whole class can see the answer. Questions are anonymous.

You can use the whole internet, but **may not communicate with another human except using the Q&A above.**

## Tips

* Push your master branch up to GitHub after each question you answer so you're not worried about pushing at the end of the exam.
* Use git branches if you're worried about screwing up what you worked on previously.
* Do the first questions first --- they are easiest.
* Track your dependencies using either npm or yarn. If you use npm, don't forget to `--save` the dependency so that it appears in your `package.json` file.
* You should define a "start" script in your `package.json` file so that `npm start` works when I grade your assignment.
