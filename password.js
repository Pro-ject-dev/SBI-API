const bcrypt = require('bcrypt');

(async () => {
  try {
    const plainPassword = 'Va@12345678';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // await Employee.update(
    //   { password: hashedPassword },
    //   { where: { mail: 'test@example.com' } } // change mail to your user
    // );

    console.log("✅ Password updated to bcrypt hash:", hashedPassword);
    process.exit(0); // exit script
  } catch (err) {
    console.error("❌ Error updating password:", err);
    process.exit(1);
  }
})();
