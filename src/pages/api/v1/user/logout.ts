import { withNextCorsSessionRoute } from "../../../../withSession";

export default withNextCorsSessionRoute(async (req, res) => {
  req.session.destroy();

  await req.session.save();
  res.status(200).send("");
});
