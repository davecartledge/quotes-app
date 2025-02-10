export default function Header() {
  return (
    <header className="pt-4">
      <h1 className="text-3xl font-semibold mb-4 border-b-4 pb-4">Quote</h1>
      <div className="text-sm md:text-base flex justify-between my-8">
        <div>
          <p>
            Mr John Smith<br />
            1 Central Street<br />
            London<br />
            W12 345
          </p>
        </div>
        <address className="not-italic text-right flex flex-col gap-4">
          <p>
            Heatpumps 4U Ltd<br />
            123 Green Avenue<br />
            London W23 456
          </p>
          <p>
            Phone: <a href="tel:+0123456789">0123 456 789</a><br />
            Email: <a href="mailto:jim@heatpumps4u.com">jim@heatpumps4u.com</a>
          </p>
        </address>
      </div>
    </header>
  );
}
