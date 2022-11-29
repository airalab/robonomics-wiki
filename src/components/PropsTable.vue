<template>
  <div class="table-wrapper">
    <table class="props-table" role="table">
    <thead role="rowgroup">
      <tr role="row">
        <th role="columnheader">Property</th>
        <th role="columnheader">Type</th>
        <th role="columnheader">Required</th>
        <th role="columnheader">Default</th>
        <th role="columnheader">Description</th>
      </tr>
    </thead>
    <tbody role="rowgroup">
      <tr orle="row" v-for="prop in items" :key="prop.id">
        <td role="cell" v-for="(item, index) in prop.items" :key="index">
          <code v-if="item.code">{{item.name}}</code>
          <p class="props-table__descr" v-if="!item.code && !Array.isArray(item.name)">{{item.name}}</p>
          <div v-if="Array.isArray(item.name)">
            <div v-for="(descr, index) in item.name" :key="index">
              <p class="props-table__descr"  v-if="!descr.codeText">{{descr.text}}</p>
              <p  class="props-table__descr space"  v-else>
                - {{descr.text}} <code>{{descr.codeText}}</code>
              </p>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
export default {

  name: 'PropsTable',
  props: {
    items: {
      type: Array,
      required: true,
      default: []
    }
  }

}
</script>

<style scoped>

  .table-wrapper {
    margin-bottom: var(--space);
    overflow-y: auto;
  }
  table.props-table {
    display: table;
    width: 100%;
    margin-bottom: 1rem;
    color: var(--text-color);
    font-size: 90%;
    background-color: var(--body-bg);
    white-space: nowrap;
    font-family: var(--font-family-code);
  }

  thead {
    display: table-header-group;
    vertical-align: middle;
  }

  tbody {
    display: table-row-group;
    vertical-align: middle;
  }

  tr {
    display: table-row;
    vertical-align: inherit;
  }

  th {
    text-align: inherit;
    text-align: -webkit-match-parent;
  }

  .props-table td, .props-table th {
    vertical-align: middle;
  }

  .props-table__descr {
    padding: 0;
    margin: 0;
    word-wrap: break-word;
    font-size: 85%;
  }

  .props-table__descr.space {
    padding-left: 20px;
  }

</style>