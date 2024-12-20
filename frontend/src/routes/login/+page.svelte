<script>
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";

  export let form;

  $: if (form?.success) {
    goto("/admin/dashboard");
  }
</script>

<div class="row justify-content-center mt-5">
  <div class="col-md-4">
    <div class="card border-0 rounded shadow-sm">
      <div class="card-body">
        <h4>LOGIN</h4>
        <hr />
        <form method="POST" action="?/login" use:enhance>
          <div class="form-group mb-3">
            <label class="mb-1 fw-bold">Email address</label>
            <input
              type="email"
              name="email"
              class="form-control {form?.errors?.some((e) => e.path === 'email')
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

          <div class="form-group mb-3">
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

          <button type="submit" class="btn btn-primary w-100">LOGIN</button>
        </form>
      </div>
    </div>
  </div>
</div>
