const nodemailer = require("nodemailer");

class MailingController {
  async mailing(req, res) {
    const { email } = req.body;
    const user = req.body.user;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "viniskidev@gmail.com",
        pass: "pufhbospkpkwgyfo",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: "RealMadryt.pl by Viniski <viniskiCode@gmail.com>",
      to: email,
      subject: "Witamy na RealMadryt.pl by Viniski",
      text: `Witaj w gronie madridistas ${user}!
      Cieszymy się że dołączyłeś do naszej społeczności. Od teraz możesz w pełni korzystać z naszego potralu!
      Specjalnie dla naszych nowych użytkowników przygotoailśmy specjalne kody rabatowe razem z naszym sponsorem, sklepem Bernabeu.pl, poniżej znajdziesz swój kod rabatowy 10% na zakupy online.
      KOD RABATOWY: H6554HVD6 
      Hala Madrid y Nada Mas!

      Redakcja RM.pl by Viniski`,
      html: `Witaj w gronie madridistas ${user}!<br>
      Cieszymy się że dołączyłeś do naszej społeczności. Od teraz możesz w pełni korzystać z naszego potralu!
      Specjalnie dla naszych nowych użytkowników przygotoailśmy specjalne kody rabatowe razem z naszym sponsorem, sklepem Bernabeu.pl, poniżej znajdziesz swój kod rabatowy 10% na zakupy online.<br>
      <b>KOD RABATOWY: H6554HVD6</b><br> 
      Hala Madrid y Nada Mas!<br>
      <br>
      Redakcja RM.pl by Viniski`,
    });

    res.sendStatus(200);
  }
}

module.exports = new MailingController();
