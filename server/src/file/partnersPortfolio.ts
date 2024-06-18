// import multer from 'multer';
import multer from 'multer';
import path from 'path';

// const partnersPortfolioMulter = multer({
//   storage: multer.diskStorage({
//     filename(req, file, done) {
//       console.log('filename');
//       console.log(req);
//       console.log(file);
//       done(null, file.originalname);
//     },
//     destination(req, file, done) {
//       console.log('destination');
//       console.log(req);
//       console.log(file);
//       done(null, path.join(__dirname, 'public'));
//     },
//   }),
// }).single('uploaded');

const partnersPortfolioMulter = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, path.join(__dirname, '../../public/images/portfolios'));
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
}).single('image');

export default partnersPortfolioMulter;
