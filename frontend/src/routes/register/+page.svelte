<script>
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";

  export let form;

  $: if (form?.success) {
    goto("/login");
  }
</script>

<div class="row justify-content-center">
  <div class="col-md-5">
    <div class="card border-0 rounded shadow-sm">
      <div class="card-body">
        <h4>REGISTER</h4>
        <hr />
        <form method="POST" action="?/register" use:enhance>
          <div class="row">
            <div class="col-md-12 mb-3">
              <div class="form-group">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="mb-1 fw-bold">Full Name</label>
                <input
                  type="text"
                  name="name"
                  class="form-control {form?.errors?.some(
                    (e) => e.path === 'name'
                  )
                    ? 'is-invalid'
                    : ''}"
                  placeholder="Full Name"
                  value={form?.values?.name || ""}
                />
                {#if form?.errors?.some((e) => e.path === "name")}
                  <div class="invalid-feedback">
                    {form.errors.find((e) => e.path === "name").msg}
                  </div>
                {/if}
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 mb-3">
              <div class="form-group">
                <label class="mb-1 fw-bold">Email address</label>
                <input
                  type="email"
                  name="email"
                  class="form-control {form?.errors?.some(
                    (e) => e.path === 'email'
                  )
                    ? 'is-invalid'
                    : ''}"
                  placeholder="Email Address"
                  value={form?.values?.email || ""}
                />
                {#if form?.errors?.some((e) => e.path === "email")}
                  <div class="invalid-feedback">
                    {form.errors.find((e) => e.path === "email").msg}
                  </div>
                {/if}
              </div>
            </div>
            <div class="col-md-12 mb-3">
              <div class="form-group">
                <label class="mb-1 fw-bold">Password</label>
                <input
                  type="password"
                  name="password"
                  class="form-control {form?.errors?.some(
                    (e) => e.path === 'password'
                  )
                    ? 'is-invalid'
                    : ''}"
                  placeholder="Password"
                />
                {#if form?.errors?.some((e) => e.path === "password")}
                  <div class="invalid-feedback">
                    {form.errors.find((e) => e.path === "password").msg}
                  </div>
                {/if}
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-primary w-100">REGISTER</button>
        </form>
      </div>
    </div>
  </div>
</div>
