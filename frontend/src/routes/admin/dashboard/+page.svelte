<script>
  import SidebarMenu from "../../../components/SidebarMenu.svelte";

  export let data;
</script>

<div class="container mt-5 mb-5">
  <div class="row">
    <div class="col-md-3">
      <SidebarMenu />
    </div>
    <div class="col-md-9">
      <div class="card border-0 rounded shadow-sm">
        <div class="card-header">DASHBOARD</div>
        <div class="card-body">
          Selamat Datang, <strong>{data.user?.name}</strong>
        </div>
      </div>
    </div>
  </div>
</div>
