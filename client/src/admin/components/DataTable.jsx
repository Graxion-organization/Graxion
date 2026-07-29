import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import './DataTable.css';

export default function DataTable({
  columns,
  data,
  onRowClick,
  searchPlaceholder = 'Search...',
  emptyMessage = 'No records found',
  pagination,
  onPageChange,
  onSearch,
  onSort,
  sortBy,
  sortOrder,
  actions,
  selectedRows,
  onSelectRow,
  onSelectAll,
  loading,
}) {
  const [localSearch, setLocalSearch] = useState('');

  function handleSearch(e) {
    const value = e.target.value;
    setLocalSearch(value);
    if (onSearch) onSearch(value);
  }

  function handleSort(column) {
    if (!column.sortable || !onSort) return;
    const newOrder = sortBy === column.key && sortOrder === 'asc' ? 'desc' : 'asc';
    onSort(column.key, newOrder);
  }

  return (
    <div className="data-table-wrapper">
      {/* Search & Actions Bar */}
      <div className="data-table-toolbar">
        <div className="data-table-search">
          <Search size={16} />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={localSearch}
            onChange={handleSearch}
          />
        </div>
        {actions && <div className="data-table-actions">{actions}</div>}
      </div>

      {/* Table */}
      <div className="data-table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              {onSelectAll && (
                <th className="data-table-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedRows?.length === data?.length && data?.length > 0}
                    onChange={(e) => onSelectAll(e.target.checked)}
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col)}
                  className={col.sortable ? 'sortable' : ''}
                  style={{ width: col.width || 'auto' }}
                >
                  <div className="data-table-th-content">
                    {col.label}
                    {col.sortable && sortBy === col.key && (
                      <span className="data-table-sort-icon">
                        {sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + (onSelectAll ? 1 : 0)} className="data-table-loading">
                  <div className="admin-loading-spinner" />
                  <span>Loading...</span>
                </td>
              </tr>
            ) : !data || data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (onSelectAll ? 1 : 0)} className="data-table-empty">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr
                  key={row._id || i}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`${onRowClick ? 'clickable' : ''} ${
                    selectedRows?.includes(row._id) ? 'selected' : ''
                  }`}
                >
                  {onSelectAll && (
                    <td className="data-table-checkbox" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedRows?.includes(row._id)}
                        onChange={() => onSelectRow(row._id)}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className="data-table-pagination">
          <span className="data-table-pagination-info">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
            {pagination.total}
          </span>
          <div className="data-table-pagination-controls">
            <button
              disabled={pagination.page <= 1}
              onClick={() => onPageChange(pagination.page - 1)}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: Math.min(pagination.pages, 5) }, (_, i) => {
              let pageNum;
              if (pagination.pages <= 5) {
                pageNum = i + 1;
              } else if (pagination.page <= 3) {
                pageNum = i + 1;
              } else if (pagination.page >= pagination.pages - 2) {
                pageNum = pagination.pages - 4 + i;
              } else {
                pageNum = pagination.page - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  className={pagination.page === pageNum ? 'active' : ''}
                  onClick={() => onPageChange(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              disabled={pagination.page >= pagination.pages}
              onClick={() => onPageChange(pagination.page + 1)}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
