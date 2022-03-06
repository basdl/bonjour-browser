<script lang="ts">
	/**
	 * Home HTML
	 * =====================
	 *
	 * @contributors: Bastian Huber
	 *
	 * @license: MIT License
	 *
	 */
	import Footer from "@components/common/footer/footer.svelte";
	import { translate } from "@app/translations/translate";

	import { DataTable, Toolbar, ToolbarContent, ToolbarSearch } from "carbon-components-svelte";
	import { onDestroy, onMount } from "svelte";
	import type { DataTableRow } from "carbon-components-svelte/types/DataTable/DataTable.svelte";

	let timer = null;
	let services: DataTableRow[] = [];
	let needle = "";
	$: filteredServices = services.filter((x) => JSON.stringify(x).toLocaleLowerCase().indexOf(needle) >= 0);

	function searchInput(e) {
		needle = e.target.value.toLowerCase();
	}

	onMount(() => {
		timer = setInterval(async () => {
			services = await window.electron.doThing();
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(timer);
	});
</script>

<DataTable
	size="short"
	sortable
	title="MDNS Services"
	description="HTTP,HTTPS,OCA,OCASEC Services"
	expandable
	headers={[
		{ key: "name", value: "Name" },
		{ key: "protocol", value: "Protocol" },
		{ key: "port", value: "Port" },
		{ key: "host", value: "Host" },
	]}
	rows={filteredServices}
>
	<svelte:fragment slot="expanded-row" let:row>
		<pre>
      {JSON.stringify(row, null, 2)}
    </pre>
	</svelte:fragment>

	<Toolbar>
		<ToolbarContent>
			<ToolbarSearch on:input={searchInput} />
		</ToolbarContent>
	</Toolbar>
</DataTable>

<Footer />

<style lang="scss">
	@import "./home.scss";
</style>
