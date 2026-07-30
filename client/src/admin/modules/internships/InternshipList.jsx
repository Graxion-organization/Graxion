import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AdminAuthContext';
import { internshipAPI } from '../../../utils/api';
import DataTable from '../../components/DataTable';
import { ConfirmModal } from '../../components/Modal';
import {
  UserPlus,
  Eye,
  Edit,
  Trash2,
  Award,
  Download,
  Filter,
} from 'lucide-react';
import './InternshipList.css';

export default function InternshipList() {
  const { adminPath } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, name: '' });
  const [page, setPage] = useState(1);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 20,
        sortBy,
        sortOrder,
      };
      if (searchQuery) params.search = searchQuery;
      if (statusFilter) params.status = statusFilter;

      const response = await internshipAPI.getAll(params);
      setData(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Failed to fetch internships:', error);
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, sortBy, sortOrder, statusFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Debounced search
  let searchTimeout;
  function handleSearch(query) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setSearchQuery(query);
      setPage(1);
    }, 400);
  }

  function handleSort(key, order) {
    setSortBy(key);
    setSortOrder(order);
    setPage(1);
  }

  function handleSelectRow(id) {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  }

  function handleSelectAll(checked) {
    setSelectedRows(checked ? data.map((r) => r._id) : []);
  }

  async function handleDelete() {
    try {
      await internshipAPI.delete(deleteModal.id);
      setDeleteModal({ open: false, id: null, name: '' });
      fetchData();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  }

  async function handleIssueCertificate(id) {
    try {
      await internshipAPI.issueCertificate(id);
      fetchData();
    } catch (error) {
      alert(error.message || 'Failed to issue certificate');
    }
  }

  async function handleBulkDelete() {
    if (selectedRows.length === 0) return;
    try {
      await internshipAPI.bulkDelete(selectedRows);
      setSelectedRows([]);
      fetchData();
    } catch (error) {
      console.error('Bulk delete failed:', error);
    }
  }

  const columns = [
    {
      key: 'studentName',
      label: 'Student',
      sortable: true,
      render: (val, row) => (
        <div className="il-student-cell">
          <div className="il-student-avatar">
            {val?.[0]?.toUpperCase() || '?'}
          </div>
          <div>
            <div className="il-student-name">{val}</div>
            <div className="il-student-id">{row.studentId}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'internshipTitle',
      label: 'Title',
      sortable: true,
    },
    {
      key: 'domain',
      label: 'Domain',
      sortable: true,
      render: (val) => <span className="il-domain-tag">{val}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (val) => (
        <span className={`status-badge ${val}`}>{val?.replace('-', ' ')}</span>
      ),
    },
    {
      key: 'startDate',
      label: 'Start',
      sortable: true,
      render: (val) => val ? new Date(val).toLocaleDateString() : '—',
    },
    {
      key: 'certificateId',
      label: 'Certificate',
      render: (val, row) =>
        val ? (
          <span className="il-cert-id">{val}</span>
        ) : (
          <button
            className="il-issue-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleIssueCertificate(row._id);
            }}
            title="Issue Certificate"
          >
            <Award size={14} />
            Issue
          </button>
        ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="il-actions" onClick={(e) => e.stopPropagation()}>
          <button
            className="il-action-btn"
            title="View"
            onClick={() => navigate(`/${adminPath}/students/internships/${row._id}`)}
          >
            <Eye size={15} />
          </button>
          <button
            className="il-action-btn"
            title="Edit"
            onClick={() => navigate(`/${adminPath}/students/internships/${row._id}/edit`)}
          >
            <Edit size={15} />
          </button>
          <button
            className="il-action-btn danger"
            title="Delete"
            onClick={() =>
              setDeleteModal({ open: true, id: row._id, name: row.studentName })
            }
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="internship-list">
      <div className="il-header">
        <div>
          <h1>Internships & Courses</h1>
          <p>Manage all student records</p>
        </div>
        <button
          className="admin-btn-primary"
          onClick={() => navigate(`/${adminPath}/students/internships/new`)}
        >
          <UserPlus size={18} />
          Add New
        </button>
      </div>

      {/* Filters */}
      <div className="il-filters">
        <div className="il-filter-group">
          <Filter size={14} />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Status</option>
            <option value="enrolled">Enrolled</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="certificate-issued">Certificate Issued</option>
            <option value="dropped">Dropped</option>
          </select>
        </div>

        {selectedRows.length > 0 && (
          <div className="il-bulk-actions">
            <span>{selectedRows.length} selected</span>
            <button className="admin-btn-secondary danger-text" onClick={handleBulkDelete}>
              <Trash2 size={14} />
              Delete Selected
            </button>
          </div>
        )}
      </div>

      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        pagination={pagination}
        onPageChange={setPage}
        onSearch={handleSearch}
        onSort={handleSort}
        sortBy={sortBy}
        sortOrder={sortOrder}
        selectedRows={selectedRows}
        onSelectRow={handleSelectRow}
        onSelectAll={handleSelectAll}
        onRowClick={(row) => navigate(`/${adminPath}/students/internships/${row._id}`)}
        searchPlaceholder="Search by name, ID, email..."
        emptyMessage="No internship records found. Click 'Add New' to create one."
      />

      <ConfirmModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, id: null, name: '' })}
        onConfirm={handleDelete}
        title="Delete Record"
        message={`Are you sure you want to delete the record for "${deleteModal.name}"? This action cannot be undone.`}
      />
    </div>
  );
}
