import { CreateButton } from "@/components/refine-ui/buttons/create"
import { DataTable } from "@/components/refine-ui/data-table/data-table"
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb"
import { ListView } from "@/components/refine-ui/views/list-view"
import { Input } from "@/components/ui/input"
import { SelectContent, SelectItem, Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ClassDetails, Subject, User } from "@/types"
import { useTable } from "@refinedev/react-table"
import { useList } from "@refinedev/core"
import { ColumnDef } from "@tanstack/react-table"
import { Search } from "lucide-react"
import { useMemo, useState } from "react"

const ClassesList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedTeacher, setSelectedTeacher] = useState('all');

  const { data: subjectsData } = useList<Subject>({
    resource: "subjects",
    pagination: { pageSize: 100 }
  });

  const { data: teachersData } = useList<User>({
    resource: "users",
    filters: [{ field: 'role', operator: 'eq', value: 'teacher' }],
    pagination: { pageSize: 100 }
  });

  const subjects = subjectsData?.data || [];
  const teachers = teachersData?.data || [];

  const subjectFilters = selectedSubject === "all" ? [] : [
    { field: 'subject', operator: 'eq' as const, value: selectedSubject }
  ];
  const teacherFilters = selectedTeacher === "all" ? [] : [
    { field: 'teacher', operator: 'eq' as const, value: selectedTeacher }
  ];
  const searchFilters = searchQuery ? [
    { field: 'name', operator: 'contains' as const, value: searchQuery }
  ] : [];

  const classesTable = useTable<ClassDetails>({
    columns: useMemo<ColumnDef<ClassDetails>[]>(() => [
      {
        id: 'bannerUrl',
        accessorKey: 'bannerUrl',
        size: 100,
        header: () => <p className="column-title ml-2">Banner</p>,
        cell: ({ getValue }) => {
          const url = getValue<string>();
          return url ? (
            <img 
              src={url} 
              alt="Class Banner" 
              className="w-12 h-12 rounded object-cover" 
            />
          ) : (
            <div className="w-12 h-12 rounded bg-muted flex items-center justify-center text-[10px] text-muted-foreground">
              No Image
            </div>
          );
        }
      },
      {
        id: 'name',
        accessorKey: 'name',
        size: 200,
        header: () => <p className="column-title ml-2">Class Name</p>,
        cell: ({ getValue }) => <span className="font-medium ml-2">{getValue<string>()}</span>,
      },
      {
        id: 'status',
        accessorKey: 'status',
        size: 100,
        header: () => <p className="column-title ml-2">Status</p>,
        cell: ({ getValue }) => {
          const status = getValue<string>();
          return (
            <Badge variant={status === 'active' ? 'default' : 'secondary'}>
              {status}
            </Badge>
          );
        }
      },
      {
        id: 'subject',
        accessorKey: 'subject.name',
        size: 150,
        header: () => <p className="column-title ml-2">Subject</p>,
        cell: ({ getValue }) => <span>{getValue<string>()}</span>
      },
      {
        id: 'teacher',
        accessorKey: 'teacher.name',
        size: 150,
        header: () => <p className="column-title ml-2">Teacher</p>,
        cell: ({ getValue }) => <span>{getValue<string>()}</span>
      },
      {
        id: 'capacity',
        accessorKey: 'capacity',
        size: 100,
        header: () => <p className="column-title ml-2">Capacity</p>,
        cell: ({ getValue }) => <span>{getValue<number>()}</span>
      },
    ], []),
    refineCoreProps: {
      resource: 'classes',
      pagination: { pageSize: 10, mode: 'server' },
      filters: {
        permanent: [...subjectFilters, ...teacherFilters, ...searchFilters]
      },
      sorters: {
        initial: [
          { field: 'id', order: 'desc' }
        ]
      }
    }
  });

  return (
    <ListView>
      <Breadcrumb />

      <h1 className="page-title">Classes</h1>
      <div className="intro-row">
        <p>Quick access to essential metrics and management tools.</p>

        <div className="actions-row">
          <div className="search-field">
            <Search className="search-icon" />

            <Input
              type="text"
              placeholder="Search by name..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Select
              value={selectedSubject}
              onValueChange={setSelectedSubject}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">
                  All Subjects
                </SelectItem>
                {subjects.map(subject => (
                  <SelectItem
                    key={subject.id}
                    value={subject.name}
                  >
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedTeacher}
              onValueChange={setSelectedTeacher}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by teacher" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">
                  All Teachers
                </SelectItem>
                {teachers.map(teacher => (
                  <SelectItem
                    key={teacher.id}
                    value={teacher.name}
                  >
                    {teacher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <CreateButton resource="classes" />
          </div>
        </div>
      </div>

      <DataTable table={classesTable} />
    </ListView>
  )
}

export default ClassesList
