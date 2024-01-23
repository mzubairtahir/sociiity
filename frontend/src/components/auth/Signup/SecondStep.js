export default function SecondStep({ step, setStep, makingAccount, onSubmit }) {
  return (
    <>
      <div id="secondStep" style={{ display: `${step === 1 ? "none" : ""}` }}>
        <div className="form-group">
          <label htmlFor="inputFirstName">First name</label>
          <input
            type="text"
            className="form-control"
            id="inputFirstName"
            placeholder="First name"
            name="first_name"
            autoComplete="given-name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputLastName">Last name</label>
          <input
            type="text"
            className="form-control"
            id="inputLastName"
            placeholder="Last name"
            name="last_name"
            autoComplete="family-name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputUsername">Username</label>
          <input
            type="text"
            className="form-control"
            id="inputUsername"
            placeholder="Last name"
            name="username"
            autoComplete="off"
          />
        </div>

        <div className="d-flex justify-content-center">
          <button
            disabled={makingAccount}
            type="submit"
            className="btn btn-primary"
          >
            {makingAccount ? "Creating account..." : "Create account"}
          </button>
        </div>
        <div className="py-2">
          <button
            className="btn btn-dark"
            type="button"
            onClick={() => {
              setStep(1);
            }}
          >
            Previous
          </button>
        </div>
      </div>
    </>
  );
}
