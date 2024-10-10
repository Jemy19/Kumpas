import {
  Users,
  FileText,
  BookType,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import axios from 'axios'
import {toast} from 'react-hot-toast'
import SkeletonDashboard from '../skeletons/dashskeleton'; // Adjust the path as neededs

export function Dashboard() {
    // for creating new sign language
    const [totals, setTotals] = useState({
      totalUsers: 0,
      totalWords: 0,
      totalFeedbacks: 0,
      totalFrequency: 0
    });
    const [loading, setLoading] = useState(true);
    const [wordsAscending, setWordsAscending] = useState([]);
    const [wordsDescending, setWordsDescending] = useState([]);

    useEffect(() => {
      axios.get('/getTotalCounts')
        .then(({ data }) => {
          setTotals(data); // Assuming the backend returns the totals in { totalUsers, totalWords, totalFeedbacks }
        })
        .catch((error) => {
          toast.error('Error fetching total counts');
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);
    useEffect(() => {
    const fetchWordsByUsage = async () => {
      try {
        // Make API request to fetch both ascending and descending words
        const response = await axios.get('/getWordsSortedByUsage'); // replace with your actual endpoint

        // Set both ascending and descending words in state
        setWordsAscending(response.data.wordsAscending);
        setWordsDescending(response.data.wordsDescending);
        setLoading(false);
      } catch (err) {
        toast.error('Error fetching word by usage');
        setLoading(false);
      }
    };

    fetchWordsByUsage();
  }, []);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <Navbar />
      </div>
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {loading ? (
            <SkeletonDashboard />
            ) : (
            <>
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card x-chunk="dashboard-01-chunk-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totals.totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  ...
                </p>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Phrases Used</CardTitle>
                <BookType className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totals.totalFrequency}</div>
                <p className="text-xs text-muted-foreground">
                  ...
                </p>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Number Of Assets</CardTitle>
                <FileText  ty className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totals.totalWords}</div>
                <p className="text-xs text-muted-foreground">
                  ...
                </p>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Feedbacks</CardTitle>
                <BookType className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totals.totalFeedbacks}</div>
                <p className="text-xs text-muted-foreground">
                  ...
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Most Used Phrases</CardTitle>
                <CardDescription>Most Used Sign Language Phrases</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="max-h-[450px]"> {/* Fixed height */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden xl:table-column">Type</TableHead>
                    <TableHead className="text-right">Number Of Times Used</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wordsDescending.slice(0, 5).map((word, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{word.title}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {word.category}
                        </div>
                      </TableCell>
                      <TableCell className="text-right" colSpan={2}>{word.frequency}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Least Used Phrases</CardTitle>
            </CardHeader>
            <CardContent className="max-h-[450px]"> {/* Fixed height */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden xl:table-column">Type</TableHead>
                    <TableHead className="text-right">Number Of Times Used</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wordsAscending.slice(0, 5).map((word, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{word.title}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {word.category}
                        </div>
                      </TableCell>
                      <TableCell className="text-right" colSpan={2}>{word.frequency}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          </div>
          </>
         )}
        </main>
      </div>
    </div>
  )
}
export default Dashboard;

