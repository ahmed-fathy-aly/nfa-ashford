const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// News articles data
const articles = [
  {
    id: 'ashford-5k-park-run',
    title: 'Ashford 5k Park Run',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '2025-10-13',
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    tags: ['Sports', 'Events'],
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      
      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
    `
  },
  {
    id: 'ashford-200-years-railway',
    title: "Ashford's 200 Years of Railway",
    excerpt: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec velit neque auctor.',
    date: '2025-10-10',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    tags: ['Heritage', 'Trains'],
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.</p>
      
      <p>Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.</p>
      
      <p>Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus suscipit tortor eget felis porttitor volutpat.</p>
      
      <p>Pellentesque in ipsum id orci porta dapibus. Donec rutrum congue leo eget malesuada. Cras ultricies ligula sed magna dictum porta. Quisque velit nisi, pretium ut lacinia in, elementum id enim.</p>
    `
  },
  {
    id: 'no61-cafe-ashford',
    title: 'No61 Cafe: A Modern Haven in Ashford',
    excerpt: 'A very popular and trendy independent cafe with a modern, social media-savvy name bringing specialty coffee and artisan treats to Cedar Parade.',
    date: '2025-10-18',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    tags: ['Food', 'Local Business'],
    address: 'Units 3-4, Cedar Parade, Repton Ave, Ashford TN23 3TE, UK',
    coordinates: {
      lat: 51.15602346764579,
      lng: 0.8575049031636497
    },
    content: `
      <p>Nestled in the heart of Cedar Parade on Repton Avenue, No61 Cafe has quickly become one of Ashford's most beloved independent coffee shops. With its modern aesthetic and social media-savvy approach, this trendy establishment has captured the hearts of locals and visitors alike.</p>
      
      <p>The cafe's distinctive name pays homage to its location while maintaining a contemporary edge that resonates with today's coffee culture. From the moment you step through the doors at Units 3-4, you're greeted with the rich aroma of specialty coffee and the warm ambiance that has made No61 a community favorite.</p>
      
      <p>What sets No61 apart is its commitment to quality and community. The cafe serves artisan coffee sourced from ethical suppliers, alongside a carefully curated menu of fresh pastries, sandwiches, and light meals. The interior design strikes a perfect balance between Instagram-worthy aesthetics and genuine comfort, making it an ideal spot for both remote workers and social gatherings.</p>
      
      <p>Open throughout the week, No61 Cafe has become more than just a place to grab a coffee—it's a social hub where Ashford residents come together, share stories, and build connections. Whether you're looking for a quiet corner to work or a vibrant atmosphere to catch up with friends, No61 delivers on all fronts.</p>
    `
  },
  {
    id: 'protect-your-bike-ashford',
    title: 'Protect Your Bike in Ashford',
    excerpt: 'Praesent libero sed cursus ante dapibus diam. Integer nec odio sed nisi nulla quis sem at nibh elementum imperdiet.',
    date: '2025-10-08',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    tags: ['Safety', 'Cycling'],
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</p>
      
      <p>Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
      
      <p>Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem.</p>
      
      <p>Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.</p>
    `
  }
];

// Routes
app.get('/', (req, res) => {
  const isSPA = req.query.spa === 'true';
  if (isSPA) {
    // Return only content for SPA
    res.render('content/home', { articles, layout: false });
  } else {
    // Return full page with layout
    res.render('content/home', { articles });
  }
});

app.get('/article/:id', (req, res) => {
  const article = articles.find(a => a.id === req.params.id);
  if (!article) {
    return res.status(404).render('404');
  }
  
  const isSPA = req.query.spa === 'true';
  
  // Use different template for specific articles
  let template = 'content/article';
  if (article.id === 'ashford-5k-park-run') {
    template = 'content/article-5k';
  } else if (article.id === 'ashford-200-years-railway') {
    template = 'content/article-railway';
  } else if (article.id === 'no61-cafe-ashford') {
    template = 'content/article-cafe';
  }
  
  console.log(`Rendering article: ${article.id}, using template: ${template}, SPA: ${isSPA}`);
  
  if (isSPA) {
    // Return only content for SPA
    res.render(template, { article, layout: false });
  } else {
    // Return full page with layout
    res.render(template, { article });
  }
});

app.get('/about', (req, res) => {
  const isSPA = req.query.spa === 'true';
  if (isSPA) {
    // Return only content for SPA
    res.render('content/about', { layout: false });
  } else {
    // Return full page with layout
    res.render('content/about');
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});