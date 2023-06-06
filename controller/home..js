
export const homepage = async (req, res, next) => {
    try {
      res.render('./home/home');
    } catch (err) {
      console.log(err);
    }
  };